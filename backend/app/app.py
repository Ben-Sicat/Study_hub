from flask import Flask, jsonify, make_response, request
from flask_jwt_extended import JWTManager, create_access_token, decode_token
import mysql.connector
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, methods=["POST", "OPTIONS", "PUT"])

jwt = JWTManager(app)

# Database configurations
db_config = {
    'user': 'root',
    'password': 'root',
    'host': 'db',
    'port': '3306',
    'database': 'BrewandBrain'
}

warehouse_db_config = {
    'user': 'root',
    'password': 'root',
    'host': 'warehouse_db',
    'port': '3308',
    'database': 'BrewandBrain_warehouse'
}


def get_db_connection(config):
    try:
        connection = mysql.connector.connect(**config)
        return connection
    except mysql.connector.Error as err:
        print(f"Error connecting to the database: {err}")
        return None

# User-related functions
def write_to_users(data):
    connection = get_db_connection(db_config)
    if connection:
        try:
            cursor = connection.cursor()
            query = """
                INSERT INTO Users 
                (GoogleID, Username, Email, Password, FirstName, LastName, PhoneNumber, UName, Birthday, Gender, Occupation)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            
            values = (
                1, data['username'], data['email'], data['password'],
                data['firstName'], data['lastName'], data['phoneNumber'], 'UName', data['birthdate'], data['gender'], data['occupation']
            )
            cursor.execute(query, values)
            connection.commit()
            cursor.close()
            connection.close()
        except mysql.connector.Error as err:
            print(f"Error writing to Users table: {err}")

def update_user_details(user_id, updated_data):
    connection = get_db_connection(db_config)
    if connection:
        try:
            cursor = connection.cursor()
            query = """
                UPDATE Users
                SET Username = %s, Email = %s, PhoneNumber = %s, Gender = %s, Occupation = %s
                WHERE UserID = %s
            """
            values = (
                updated_data['userName'], updated_data['email'], updated_data['phoneNumber']
                , updated_data['gender'], updated_data['occupation'], user_id
            )
            cursor.execute(query, values)
            connection.commit()
            cursor.close()
            connection.close()
        except mysql.connector.Error as err:
            print(f"Error updating user details: {err}")

def get_all_users():
    connection = get_db_connection(db_config)
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            cursor.execute('SELECT * FROM Users')
            results = cursor.fetchall()
            cursor.close()
            connection.close()
            return results
        except mysql.connector.Error as err:
            print(f"Error: {err}")

def get_user_by_id(user_id):
    connection = get_db_connection(db_config)
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            query = """
                SELECT UserID, GoogleID, Username, Email, FirstName, LastName, PhoneNumber, UName, Birthday, Gender, Occupation
                FROM Users
                WHERE UserID = %s
            """
            cursor.execute(query, (user_id,))
            result = cursor.fetchone()
            cursor.close()
            connection.close()
            return result
        except mysql.connector.Error as err:
            print(f"Error fetching user by ID: {err}")

def get_user_by_email_or_username(email_or_username):
    connection = get_db_connection(db_config)
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            query = """
                SELECT UserID, GoogleID, Username, Password, Email, UName, Birthday, Gender, Occupation
                FROM Users
                WHERE Email = %s OR Username = %s
            """
            cursor.execute(query, (email_or_username, email_or_username))
            result = cursor.fetchone()
            cursor.close()
            connection.close()
            return result
        except mysql.connector.Error as err:
            print(f"Error fetching user by email or username: {err}")

def perform_warehouse_process():
    try:
        # Connect to operational database
        operational_connection = get_db_connection(db_config)
        if operational_connection:
            operational_cursor = operational_connection.cursor(dictionary=True)

            # Connect to warehouse database
            warehouse_connection = get_db_connection(warehouse_db_config)
            if warehouse_connection:
                warehouse_cursor = warehouse_connection.cursor()

                try:
                    # Extract data from the operational database
                    operational_cursor.execute("""
                        SELECT UserID, School, Occupation
                        FROM Users
                    """)
                    users_data = operational_cursor.fetchall()

                    # Transform and load data into the warehouse
                    for user in users_data:
                        # Fetch reservations for the current user
                        operational_cursor.execute("""
                            SELECT StartTime, EndTime
                            FROM Reservations
                            WHERE UserID = %s
                        """, (user['UserID'],))
                        reservations_data = operational_cursor.fetchall()

                        # Insert user and reservation data into the warehouse
                        for reservation in reservations_data:
                            warehouse_cursor.execute(
                                """
                                INSERT INTO UserSummary (UserID, School, Occupation, StartTime, EndTime)
                                VALUES (%s, %s, %s, %s, %s)
                                """,
                                (user['UserID'], user['School'], user['Occupation'],
                                 reservation['StartTime'], reservation['EndTime'])
                            )

                    # Commit changes to the warehouse database
                    warehouse_connection.commit()
                    print("Warehouse process completed successfully.")
                except Exception as e:
                    print(f"Error during ETL process: {e}")
                    warehouse_connection.rollback()  # Rollback changes in case of an error

                warehouse_cursor.close()
                warehouse_connection.close()

            operational_cursor.close()
            operational_connection.close()

    except Exception as e:
        print(f"Error performing warehouse process: {e}")

# Initialize the BackgroundScheduler
scheduler = BackgroundScheduler()

# Add the scheduled job to run the ETL process every 168 hours or 1 week
scheduler.add_job(perform_warehouse_process, 'interval', hours=168)

@app.route('/api/create-account', methods=['POST'])
def create_account():
    try:
        data = request.get_json()
        write_to_users(data)
        all_users = get_all_users()
        return jsonify({'message': 'Account created successfully', 'all_users': all_users}), 200
    except Exception as e:
        print(f"Error creating account: {e}")
        return jsonify(message='Error creating account'), 500

# Existing routes and functions...

@app.route('/api/update-account/<int:user_id>', methods=['POST'])
def update_account(user_id):
    try:
        updated_data = request.get_json()
        update_user_details(user_id, updated_data)
        
        # Check if the user exists after the update
        updated_user = get_user_by_id(user_id)
        if updated_user:
            return jsonify({'message': 'Account updated successfully', 'updated_user': updated_user}), 200
        else:
            return jsonify({'error': 'User not found after update'}), 404
    except Exception as e:
        print(f"Error updating account: {e}")
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/api/sign-in', methods=['POST'])
def sign_in():
    data = request.get_json()
    user = get_user_by_email_or_username(data['login'])
    
    if user and user['Password'] == data['password']:
        
        # token = create_access_token(identity=user['Username'])
        
        # # Access the access_token directly from create_access_token
        # access_token = decode_token(token)['identity']
        # print(access_token)

        # Fetch additional user data
        user_data = get_user_by_id(user['UserID'])

        # Create a response object
        response_data = {
            'user_data': {
                'UserID': user_data['UserID'],
                'Username': user_data['Username'],
                'Email': user_data['Email'],
                'PhoneNumber': user_data['PhoneNumber'],
                'Gender': user_data['Gender'],
                'Occupation': user_data['Occupation'],
                
                # Add other user data fields as needed
            }
        }

        response = make_response(jsonify(response_data), 200)
        
        return response
    else:
        return jsonify({"message": "Invalid login credentials"}), 401    
# @app.route('/api/update-account/', methods=['PUT'])
# def update_account(user_id):
#     try:
#         updated_data = request.get_json()
#         update_user_details(user_id, updated_data)
#         updated_user = get_user_by_id(user_id)
#         return jsonify({'message': 'Account updated successfully', 'updated_user': updated_user}), 200
#     except Exception as e:
#         print(f"Error updating account: {e}")
#         return jsonify(message='Error updating account'), 500

# @app.route('/api/get-reservations/<int:user_id>', methods=['GET'])
# def get_reservations(user_id):
#     try:
#         reservations = get_user_reservations(user_id)
#         return jsonify(reservations)
#     except Exception as e:
#         print(f"Error fetching reservations: {e}")
#         return jsonify(error='Error fetching reservations'), 500

# @app.route('/api/reservations', methods=['POST'])
# def make_reservation():
#     try:
#         data = request.get_json()
#         user_id = 5  # Replace with the actual user ID; you need to identify the user somehow
#         result = create_reservation(user_id, data)
#         return jsonify(result)
#     except Exception as e:
#         print(f"Error creating reservation: {e}")
#         return jsonify(error='Error creating reservation'), 500 


# Additional user-related functions

# Reservation-related functions (as per your existing code)
# ...

# Main route for testing
@app.route('/')
def index():
    # Create a sample user for testing
    write_to_users({
        'google_id': 'mel.id',
        'username': 'mlss_riri',
        'email': 'melaixrio@gmail.com',
        'password': 'your_password_here',
        'first_name': 'Melaissa',
        'last_name': 'Rioveros',
        'phone_number': '1234567890'
    })
    return jsonify({'User Data': 'Sample user created'})

if __name__ == '__main__':
    scheduler.start()
    app.run(host='0.0.0.0', debug=True)
