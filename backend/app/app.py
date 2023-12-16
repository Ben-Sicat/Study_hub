from flask import Flask, jsonify, make_response, request
from flask_jwt_extended import JWTManager, create_access_token, decode_token
import mysql.connector
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
import time

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
    'port': '3309',
    'database': 'BrewandBrain_warehouse'
}
try:
    connection = mysql.connector.connect(**warehouse_db_config)
    print("Connected to the warehouse database successfully!")
    connection.close()
except mysql.connector.Error as err:
    print(f"Error connecting to the warehouse database: {err}")
def wait_for_databases():
    max_retries = 30
    retry_interval = 2  # seconds

    operational_connection = None
    warehouse_connection = None

    for _ in range(max_retries):
        try:
            operational_connection = mysql.connector.connect(**db_config)
            print("Connected to the operational database successfully!")

            warehouse_connection = mysql.connector.connect(**warehouse_db_config)
            print("Connected to the warehouse database successfully!")

            operational_connection.close()
            warehouse_connection.close()
            return
        except mysql.connector.Error as err:
            print(f"Error connecting to databases: {err}")
            time.sleep(retry_interval)

    print("Unable to connect to databases after retries.")

wait_for_databases()

def get_db_connection(config):
    connection = None
    try:
        connection = mysql.connector.connect(**config)
    except mysql.connector.Error as err:
        print(f"Error connecting to the database: {err}")
    return connection
    
def close_connection(connection):
    if connection:
        connection.close()

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
                SELECT UserID, GoogleID, Username, Email, FirstName, LastName, PhoneNumber, UName, Birthday, Gender, Occupation, Level
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
            return None
        
        

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
def get_all_reservations():
    connection = get_db_connection(db_config)
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            cursor.execute("""
                            SELECT Reservations.ReservationID, Users.Username, Reservations.StartTime, Reservations.EndTime, Reservations.Seat
                            FROM Reservations
                            JOIN Users ON Reservations.UserID = Users.UserID
                        """)
            results = cursor.fetchall()
            cursor.close()
            connection.close()
            return results
        except mysql.connector.Error as err:
            print(f"Error Fetching Reservations: {err}")

def perform_warehouse_process():
    operational_connection = get_db_connection(db_config)
    warehouse_connection = get_db_connection(warehouse_db_config)

    try:
        if not operational_connection or not warehouse_connection:
            return  # Return early if unable to connect to either database

        with operational_connection.cursor(dictionary=True) as operational_cursor, \
             warehouse_connection.cursor() as warehouse_cursor:

            operational_cursor.execute("""
                SELECT Users.UserID, Users.School, Users.Occupation, Reservations.StartTime, Reservations.EndTime
                FROM Users
                LEFT JOIN Reservations ON Users.UserID = Reservations.UserID
            """)
            users_data = operational_cursor.fetchall()

            for user in users_data:
                try:
                    warehouse_cursor.execute(
                        """
                        INSERT INTO UserSummary (UserID, School, Occupation, StartTime, EndTime)
                        VALUES (%s, %s, %s, %s, %s)
                        ON DUPLICATE KEY UPDATE School=VALUES(School), Occupation=VALUES(Occupation),
                                            StartTime=VALUES(StartTime), EndTime=VALUES(EndTime)
                        """,
                        (user['UserID'], user['School'], user['Occupation'],
                         user['StartTime'], user['EndTime'])
                    )
                except mysql.connector.Error as e:
                    print(f"Error processing user {user['UserID']}: {e}")

        warehouse_connection.commit()
        print("Warehouse process completed successfully.")
    except mysql.connector.Error as e:
        print(f"Error during ETL process: {e}")
        warehouse_connection.rollback()
    finally:
        close_connection(operational_connection)
        close_connection(warehouse_connection)


# Initialize the BackgroundScheduler
scheduler = BackgroundScheduler()

# Add the scheduled job to run the ETL process every 168 hours or 1 week
scheduler.add_job(perform_warehouse_process, 'interval', hours=168)

def create_reservation(user_id, reservation_data):
    connection = get_db_connection(db_config)
    if connection:
        try:
            cursor = connection.cursor()
            query = """
                INSERT INTO Reservations (UserID, StartTime, EndTime, Seat)
                VALUES (%s, %s, %s, %s)
            """
            values = (user_id, reservation_data['starttime'], reservation_data['endtime'], reservation_data.get('seat'))
            cursor.execute(query, values)
            connection.commit()
            cursor.close()
            connection.close()
        except mysql.connector.Error as err:
            print(f"Error creating reservation: {err}")

@app.route('/api/create-reservation', methods=['POST'])
def create_reservation_route():
    try:
        data = request.get_json()
        user_id = data.get('user_id')  # Change this to fetch the user_id from your authentication mechanism
        create_reservation(user_id, data)
        return jsonify({'message': 'Reservation created successfully'}), 200
    except Exception as e:
        print(f"Error creating reservation: {e}")
        return jsonify(message='Error creating reservation'), 500

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
    
@app.route('/api/get-reservations', methods=['GET'])
def get_reservations():
    try:
        reservations = get_all_reservations()
        return jsonify({'message': 'Reservations fetched successfully', 'reservations': reservations})
    except Exception as e:
        print(f"Error fetching reservations: {e}")
        return jsonify(error='Error fetching reservations'), 500
    
@app.route('/api/get-all-users', methods=['GET'])
def get_all_users_route():
    try:
        all_users = get_all_users()
        if all_users:
            return jsonify({'accounts': all_users})
        else:
            return jsonify(error='No users found'), 404  # Change to 404 status code
    except Exception as e:
        print(f"Error in route: {e}")
        return jsonify(error='Internal server error'), 500

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
                'Level': user_data['Level'],
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
