from flask import Flask, jsonify, make_response, request
from flask_jwt_extended import JWTManager, create_access_token
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
app.config["JWT_SECRET_KEY"] = "your-secret-key"  # Change this to a secure and secret key
jwt = JWTManager(app)

# Database configuration
db_config = {
    'user': 'root',
    'password': 'root',
    'host': 'db',
    'port': '3306',
    'database': 'BrewandBrain'
}

def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except mysql.connector.Error as err:
        print(f"Error connecting to the database: {err}")
        return None

# User-related functions
def write_to_users(data):
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            query = """
                INSERT INTO Users 
                (GoogleID, Username, Email, Password, FirstName, LastName, PhoneNumber, UName, Birthday, Gender, School)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            values = (
                data['google_id'], data['username'], data['email'], data['password'],
                data['first_name'], data['last_name'], data['phone_number'], 'UName', '2003-03-05', 'Male', 'Sample School'
            )
            cursor.execute(query, values)
            connection.commit()
            cursor.close()
            connection.close()
        except mysql.connector.Error as err:
            print(f"Error writing to Users table: {err}")
def update_user_details(user_id, updated_data):
    connection= get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            query = """
                UPDATE Users
                SET FirstName = %s, LastName = %s, PhoneNumber = %s, Birthday = %s, Gender = %s, School = %s
                WHERE UserID = %s
            """
            values = (
                updated_data['first_name'], updated_data['last_name'], updated_data['phone_number'],
                updated_data['birthday'], updated_data['gender'], updated_data['school'], user_id
            )
            cursor.execute(query, values)
            connection.commit()
            cursor.close()
            connection.close()
        except mysql.connector.Error as err:
            print(f"Error updating user details: {err}")
def get_all_users():
    connection = get_db_connection()
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
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            query = """
                SELECT UserID, GoogleID, Username, Email, FirstName, LastName, PhoneNumber, UName, Birthday, Gender, School
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
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            query = """
                SELECT UserID, GoogleID, Username, Password, Email, UName, Birthday, Gender, School
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
def create_reservation(user_id, reservation_data):
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            query = """
                INSERT INTO Reservations 
                (UserID, StartTime, EndTime, Seat)
                VALUES (%s, %s, %s, %s)
            """
            values = (
                    user_id,
                    reservation_data['STime'],
                    reservation_data['ETime'],
                    reservation_data['Seat'],
                )
            cursor.execute(query, values)
            connection.commit()
            cursor.close()
            connection.close()
        except mysql.connector.Error as err:
            print(f"Error creating reservation: {err}")
def get_user_reservations(user_id):
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            query = """
                SELECT ReservationID, StartTime, EndTime, Seat
                FROM Reservations
                WHERE UserID = %s
            """
            cursor.execute(query, (user_id,))
            results = cursor.fetchall()
            cursor.close()
            connection.close()
            return results
        except mysql.connector.Error as err:
            print(f"Error fetching user reservations: {err}")
            
@app.route('/api/sign-in', methods=['POST'])
def sign_in():
    data = request.get_json()
    user = get_user_by_email_or_username(data['login'])
    
    if user and user['Password'] == data['password']:
        access_token = create_access_token(identity=user['Username'])
        
        # Create a response object
        response = make_response(jsonify(access_token=access_token), 200)
        
        # Set HttpOnly flag for the access token cookie
        response.set_cookie('access_token', value=access_token, httponly=True)
        
        return response
    else:
        return jsonify({"message": "Invalid login credentials"}), 401

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
    
@app.route('/api/update-account/<int:user_id>', methods=['PUT'])
def update_account(user_id):
    try:
        updated_data = request.get_json()
        update_user_details(user_id, updated_data)
        updated_user = get_user_by_id(user_id)
        return jsonify({'message': 'Account updated successfully', 'updated_user': updated_user}), 200
    except Exception as e:
        print(f"Error updating account: {e}")
        return jsonify(message='Error updating account'), 500

@app.route('/api/reservations', methods=['POST'])
def make_reservation():
    try:
        data = request.get_json()
        user_id = 1  # Replace with the actual user ID; you need to identify the user somehow
        result = create_reservation(user_id, data)
        return jsonify(result)
    except Exception as e:
        print(f"Error creating reservation: {e}")
        return jsonify(error='Error creating reservation'), 500 


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
    app.run(host='0.0.0.0', debug=True)
