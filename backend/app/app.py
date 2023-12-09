from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
import mysql.connector
import bcrypt
import datetime

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "your-secret-key"  # Change this to a secret key
jwt = JWTManager(app)


def get_db_connection():
    config = {
        'user': 'root',
        'password': 'root',
        'host': 'db',
        'port': '3306',
        'database': 'BrewandBrain'
    }
    try:
        connection = mysql.connector.connect(**config)
        return connection
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

def write_to_Users(GoogleID, Username, Email, Password, FirstName, LastName, PhoneNumber, UName, Birthday, Gender, School):
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            query = "INSERT INTO Users (GoogleID, Username, Email, FirstName, LastName, PhoneNumber, UName, Birthday, Gender, School) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            hashed_password = hash_password(Password)
            values = (GoogleID, Username, Email, FirstName, LastName, PhoneNumber, UName, Birthday, Gender, School)
            cursor.execute(query, values)
            connection.commit()
            cursor.close()
            connection.close()
        except mysql.connector.Error as err:
            print(f"Error: {err}")

def Users():
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            cursor.execute('SELECT UserID, GoogleID, Username, Email,  UName, Birthday, Gender, School  FROM Users')
            results = cursor.fetchall()
            cursor.close()
            connection.close()
            return results
        except mysql.connector.Error as err:
            print(f"Error: {err}")
def get_user_by_username(username):
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            query = 'SELECT UserID, GoogleID, Username, Password, Email, UName, Birthday, Gender, School FROM Users WHERE Username = %s'
            cursor.execute(query, (username,))
            result = cursor.fetchone()
            cursor.close()
            connection.close()
            return result
        except mysql.connector.Error as err:
            print(f"Error: {err}")


def write_to_Reservations(UserID, ReservationDate, ReservationTime, ReservationSite, SeatCode, HourAndRate, Status):
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            query = "INSERT INTO Reservations (UserID, ReservationDate, ReservationTime, ReservationSite, SeatCode, HourAndRate, Status) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            values = (UserID, ReservationDate, ReservationTime, ReservationSite, SeatCode, HourAndRate, Status)
            cursor.execute(query, values)
            connection.commit()
            cursor.close()
            connection.close()
        except mysql.connector.Error as err:
            print(f"Error writing to Reservations: {err}")

def Reservations():
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            cursor.execute('SELECT ReservationID, UserID, ReservationDate, ReservationTime, ReservationSite, SeatCode, HourAndRate, Status FROM Reservations')
            results = cursor.fetchall()
            cursor.close()
            connection.close()
            return results
        except mysql.connector.Error as err:
            print(f"Error fetching Reservations: {err}")

def write_to_QR_Codes(ReservationID, QRCodeData):
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            query = "INSERT INTO QR_Codes (ReservationID, QRCodeData) VALUES (%s, %s)"
            values = (ReservationID, QRCodeData)
            cursor.execute(query, values)
            connection.commit()
            cursor.close()
            connection.close()
        except mysql.connector.Error as err:
            print(f"Error writing to QR_Codes: {err}")

def QR_Codes():
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            cursor.execute('SELECT QRCodeID, ReservationID, QRCodeData FROM QR_Codes')
            results = cursor.fetchall()
            cursor.close()
            connection.close()
            return results
        except mysql.connector.Error as err:
            print(f"Error fetching QR_Codes: {err}")
            
    # aight time to do this shit ako naman  

#fetching for sign in 
def get_user_by_email_or_username(email_or_username):
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            query = 'SELECT UserID, GoogleID, Username, Email, Password, FirstName, LastName, PhoneNumber, UName, Birthday, Gender, School, Level FROM Users WHERE Email = %s OR Username = %s'
            cursor.execute(query, (email_or_username))
            result = cursor.fetchone()
            cursor.close()
            connection.close()
            return result
        except mysql.connector.Error as err:
            print(f"Error:{err}")
    
    
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def verify_password(hashed_password, password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)

#sign-in function
@app.route('/api/sign-in', methods=['POST'])
def sign_in():
    data = request.get_json()
    email_or_username = data.get('email_or_username')
    password = data.get('password')
    
    user_data = get_user_by_email_or_username(email_or_username)
    if user_data and verify_password(user_data.get('Password'), password):
        access_token = create_access_token(identity=email_or_username, expires_delta=datetime.timedelta(days=1))
        return jsonify(access_token=access_token), 200
    return jsonify(message='Invalid email/username or password'), 401

# @app.route('/api/sign-in', methods=['POST'])
# def sign_in():
#     data = request.get_json()
#     username = data.get('username')
#     password = data.get('password')

#     user_data = get_user_by_username(username)
#     if user_data and verify_password(user_data.get('Password'), password):
#         access_token = create_access_token(identity=username, expires_delta=datetime.timedelta(days=1))
#         return jsonify(access_token=access_token), 200
#     return jsonify(message='Invalid username or password'), 401

@app.route('/api/create-account', methods=['POST'])
def create_account():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        phone_number = data.get('phone_number')
        google_id = data.get('google_id')  # default None

        write_to_Users(google_id, username, email, password, first_name, last_name, phone_number, 'UName', '2003-03-05', 'Male', 'Sample School')

        # Fetch all users 
        all_users = Users()

        return jsonify({'message': 'Account created successfully', 'all_users': all_users}), 200
    except Exception as e:
        print(f"Error creating account: {e}")
        return jsonify(message='Error creating account'), 500
    


# @app.route('/test-create-account', methods=['POST'])
# def test_create_account():
#     return jsonify(message='Test route for create account works!')



@app.route('/')
def index():
    write_to_Users(None, 'mlss_riri', 'melaixrio@gmail.com', 'Melaissa', 'Rioveros', '1234567890', 'Melaissa Rioveros', '2003-03-05', 'Female', 'Adamson University')
    return jsonify({'User Data': Users()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
