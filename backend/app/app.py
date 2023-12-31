from flask import Flask, jsonify, make_response, request
from flask_jwt_extended import JWTManager, create_access_token, decode_token
import mysql.connector
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
import time

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, methods=["POST", "OPTIONS", "PUT", "GET", "DELETE"])

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
            query = """
                SELECT Reservations.ReservationID, Users.Username, Reservations.StartTime, Reservations.EndTime, Reservations.Seat, Reservations.TableFee, Reservations.ResDate
                FROM Reservations
                JOIN Users ON Reservations.UserID = Users.UserID
                UNION
                SELECT Completed_Reservations.ReservationID, Users.Username, Completed_Reservations.StartTime, Completed_Reservations.EndTime, Completed_Reservations.Seat, Completed_Reservations.TableFee, Completed_Reservations.ResDate
                FROM Completed_Reservations
                JOIN Users ON Completed_Reservations.UserID = Users.UserID
            """
            cursor.execute(query)
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

def get_reservation_by_seat(seat):
    connection = get_db_connection(db_config)
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            query = """
                SELECT Reservations.ReservationID, Users.Username, Reservations.StartTime, Reservations.EndTime, Reservations.Seat, Reservations.TableFee, Reservations.ResDate
                FROM Reservations
                JOIN Users ON Reservations.UserID = Users.UserID
                WHERE Reservations.Seat = %s 
                LIMIT 1
                
            """
            cursor.execute (query, (seat,))
            result = cursor.fetchone()
            cursor.close()
            connection.close()
            return result
        except mysql.connector.Error as err:
            print(f"Error fetching reservation by seat: {err}")
            return None

def update_reservation_endtime(chair_id, endtime): 
    connection = get_db_connection(db_config)
    try:
        cursor = connection.cursor()
        current_reservation = get_reservation_by_seat(chair_id)
        if current_reservation:
            query = """
                UPDATE Reservations
                SET EndTime = %s
                WHERE Seat = %s
            """
            values = (endtime, chair_id)
            cursor.execute(query, values)
            connection.commit()
            cursor.close()
            connection.close()
            return {'message': 'Reservation updated successfully'}
        else:
            return {'error': 'Reservation not found for the specified seat'}
    except mysql.connector.Error as err:
        print(f"Error updating reservation: {err}")
        connection.rollback()
        return {'error': f"Error updating reservation: {err}"}

def remove_reservation(chair_id):
    connection = get_db_connection(db_config)
    try: 
        cursor = connection.cursor()
        current_reservation = get_reservation_by_seat(chair_id)
        if current_reservation:
            query = """
                DELETE FROM Reservations
                WHERE Seat = %s
            """
            values = (chair_id,)
            cursor.execute(query, values)
            connection.commit()
            cursor.close()
            connection.close()
            return {'message': 'Reservation removed successfully'}
        else:
            return {'error': 'Reservation not found for the specified seat'}
    except mysql.connector.Error as err:
        print(f"Error removing reservation: {err}")
        connection.rollback()
        return {'error': f"Error removing reservation: {err}"}
    
def is_overlapping(start_time, end_time, e_start_time, e_end_time):
    start_time = datetime.strptime(start_time, '%H:%M:%S')
    end_time = datetime.strptime(end_time, '%H:%M:%S')
    e_end_time = datetime.strptime(e_end_time, '%H:%M:%S')
    e_start_time = datetime.strptime(e_start_time, '%H:%M:%S')
    return start_time < e_end_time and e_start_time < end_time
    

def create_reservation(user_id, reservation_data):
    connection = get_db_connection(db_config)
    if connection:
        try:
            cursor = connection.cursor()
            query = """
                INSERT INTO Reservations (UserID, StartTime, EndTime, Seat, TableFee, ResDate)
                VALUES (%s, %s, %s, %s, %s, %s)
            """
            values = (
                user_id,
                reservation_data['starttime'],
                reservation_data['endtime'],
                reservation_data['seat'],
                reservation_data['tablefee'],
                reservation_data['resdate']
            )
            cursor.execute(query, values)
            reservation_id = cursor.lastrowid

            connection.commit()
            cursor.close()
            connection.close()
            return {'message': 'Reservation created successfully', 'reservation_id': reservation_id}
        except mysql.connector.Error as err:
            print(f"Error creating reservation: {err}")
            connection.rollback()
            return {'error': f"Error creating reservation: {err}"}

def create_waitlist_entry(user_id, username):
    connection = get_db_connection(db_config)
    if connection:
        try:
            cursor = connection.cursor()
            query = """
                INSERT INTO Waitlist (UserID, Username)
                VALUES (%s, %s)
            """
            values = (user_id, username)
            cursor.execute(query, values)
            connection.commit()
            cursor.close()
            connection.close()
            return {'message': 'Waitlist entry created successfully'}
        except mysql.connector.Error as err:
            print(f"Error creating waitlist entry: {err}")
            connection.rollback()
            return {'error': f"Error creating waitlist entry: {err}"}

def get_all_waitlist_entries():
    connection = get_db_connection(db_config)
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            cursor.execute('SELECT * FROM Waitlist')
            entries = cursor.fetchall()
            cursor.close()
            connection.close()
            return entries
        except mysql.connector.Error as err:
            print(f"Error fetching waitlist entries: {err}")
            return None
def get_reservation_by_id(reservation_id):
    connection = get_db_connection(db_config)
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            query = """
                SELECT * FROM Reservations WHERE ReservationID = %s
            """
            cursor.execute(query, (reservation_id,))
            result = cursor.fetchone()
            cursor.close()
            connection.close()
            return result
        except mysql.connector.Error as err:
            print(f"Error fetching reservation by ID: {err}")
            return None

def remove_reservation_by_id(reservation_id):
    connection = get_db_connection(db_config)
    if connection:
        try:
            cursor = connection.cursor()
            query = """
                DELETE FROM Reservations
                WHERE ReservationID = %s
            """
            cursor.execute(query, (reservation_id,))
            connection.commit()
            cursor.close()
            connection.close()
            return {'message': 'Reservation removed successfully'}
        except mysql.connector.Error as err:
            print(f"Error removing reservation: {err}")
            connection.rollback()
            return {'error': f"Error removing reservation: {err}"}

def move_to_completed_reservations(reservation_id):
    connection = get_db_connection(db_config)
    if connection:
        try:
            cursor = connection.cursor()
            
            # Fetch reservation details
            query = """
                SELECT * FROM Reservations WHERE ReservationID = %s
            """
            cursor.execute(query, (reservation_id,))
            reservation = cursor.fetchone()
            
            if reservation:
                # Insert into Completed_Reservations table
                insert_query = """
                    INSERT INTO Completed_Reservations(ReservationID, UserID, ResDate, StartTime, EndTime, Seat, TableFee)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
                values = (
                    reservation[0], reservation[1], reservation[2], reservation[3], reservation[4], reservation[5], reservation[6]
                )
                cursor.execute(insert_query, values)
                
                # Delete from Reservations table
                delete_query = """
                    DELETE FROM Reservations WHERE ReservationID = %s
                """
                cursor.execute(delete_query, (reservation_id,))
                
                connection.commit()  # Commit changes
                cursor.close()
                connection.close()
                
                print(f"Reservation {reservation_id} moved to completed reservations.")
                
        except mysql.connector.Error as err:
            print(f"Error moving reservation {reservation_id} to completed reservation: {err}")
            connection.rollback()  # Rollback in case of error


@app.route('/api/check-reservations-end', methods=['POST'])
def check_reservation_end_route():
    try:
        current_time_str = request.json.get('current_time', None)
        current_hours, current_minutes = map(int, current_time_str.split(':'))
        
        connection = get_db_connection(db_config)
        cursor = connection.cursor(dictionary=True)
        
        query = """
            SELECT * FROM Reservations
        """
        cursor.execute(query)
        
        reservations = cursor.fetchall()
        cursor.close()
        connection.close()
        
        for reservation in reservations:
            end_time_str = reservation['EndTime']
            if is_before_or_equal(end_time_str, current_hours, current_minutes):
                move_to_completed_reservations(reservation['ReservationID'])
            
        return jsonify({'message': 'Checked and processed reservations successfully.'}), 200
        
    except Exception as e:
        print(f"Error checking reservations end: {e}")
        return jsonify(error=f'Error checking reservations end: {e}'), 500



def is_before_or_equal(end_time_str, current_hours, current_minutes):
    """
    Check if the end_time_str (format: 'HH:MM') is before or equal to the current time components.
    """
    end_hours, end_minutes = map(int, end_time_str.split(':'))
    
    if end_hours < current_hours:
        return True
    elif end_hours == current_hours and end_minutes <= current_minutes:
        return True
    else:
        return False

@app.route('/api/remove-reservation/<string:chair_id>', methods=['DELETE'])
def remove_reservation_route(chair_id):
    try:
        result = remove_reservation(chair_id)
        if 'error' in result:
            return jsonify(result), 404
        else:
            return jsonify(result), 200
    except Exception as e:
        print(f"Error removing reservation: {e}")
        return jsonify(error='Error removing reservation'), 500
    
@app.route('/api/update-reservation-endtime/<string:chair_id>/<string:endtime>', methods=['PUT'])
def update_endtime_route(chair_id, endtime):
    try:
        result = update_reservation_endtime(chair_id, endtime)
        if 'error' in result:
            return jsonify(result), 404
        else:
            return jsonify(result), 200
    except Exception as e:
        print(f"Error updating reservation: {e}")
        return jsonify(error='Error updating reservation'), 500


@app.route('/api/get-reservation-by-id/<int:reservation_id>', methods=['GET'])
def get_reservation_by_id_route(reservation_id):
    try:
        reservation = get_reservation_by_id(reservation_id)
        if reservation:
            return jsonify({'reservation': reservation}), 200
        else:
            return jsonify({'error': 'Reservation not found'}), 404
    except Exception as e:
        print(f"Error fetching reservation by ID: {e}")
        return jsonify({'error': str(e)}), 500

        
@app.route('/api/get-reservation-by-seat/<string:seat>', methods=['GET'])
def get_reservation_by_seat_route(seat):
    try:
        reservation = get_reservation_by_seat(seat)
        if reservation:
            return jsonify({'reservation': reservation}), 200
        else:
            return jsonify({'error': 'Reservation not found for the specified seat'}), 404
    except Exception as e:
        print(f"Error fetching reservation by seat: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/get-waitlist-entries', methods=['GET'])
def get_waitlist_entries_route():
    try:
        entries = get_all_waitlist_entries()
        if entries:
            return jsonify({'waitlist_entries': entries})
        else:
            return jsonify(error='No waitlist entries found'), 404
    except Exception as e:
        print(f"Error fetching waitlist entries: {e}")
        return jsonify(error='Error fetching waitlist entries'), 500

@app.route('/api/create-waitlist-entry', methods=['POST'])
def create_waitlist_entry_route():
    try:
        data = request.get_json()
        user_id = data.get('user_id')  # Change this to fetch the user_id from your authentication mechanism
        username = data.get('username')
        create_waitlist_entry(user_id, username)
        return jsonify({'message': 'Waitlist entry created successfully'}), 200
    except Exception as e:
        print(f"Error creating waitlist entry: {e}")
        return jsonify(message='Error creating waitlist entry'), 500



@app.route('/api/create-reservation', methods=['POST'])
def create_reservation_route():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        start_time = data.get('starttime')
        end_time = data.get('endtime')
        tablefee = data.get('tablefee')
        seat = data.get('seat')
        
        existing_reservation = get_reservation_by_seat(seat)

        if existing_reservation and is_overlapping(start_time, end_time, existing_reservation['StartTime'], existing_reservation['EndTime']):
            return jsonify({'error': 'Seat already booked for this time range!'}), 400

        response = create_reservation(user_id, data)
         
        if 'error' in response:
            return jsonify(response), 500
        else:
            return jsonify(response), 200
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
    
@app.route('/api/get-user/<int:user_id>', methods=['GET'])
def get_user_by_id_route(user_id):
    try:
        user = get_user_by_id(user_id)
        if user:
            return jsonify({'user': user}), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        print(f"Error fetching user by ID: {e}")
        return jsonify({'error': str(e)}), 500


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