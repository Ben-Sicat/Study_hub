from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

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

def write_to_Users(GoogleID, Username, Email, UName, Birthday, Gender, School):
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            query = "INSERT INTO Users (GoogleID, Username, Email, Name, Birthday, Gender, School) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            values = (GoogleID, Username, Email, UName, Birthday, Gender, School)
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

def write_to_Reservations(UserID,  ReservationDate, ReservationTime, ReservationSite, Status):
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            query = "INSERT INTO Reservations (UserID, ReservationDate, ReservationTime, ReservationSite, Status) VALUES (%s, CURRENT_DATE(), CURRENT_TIME(), %s, %s)"
            values = (UserID,  ReservationDate, ReservationTime, ReservationSite, Status)
            cursor.execute(query, values)
            connection.commit()
            cursor.close()
            connection.close()
        except mysql.connector.Error as err:
            print(f"Error: {err}")
            
def Reservations():
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            cursor.execute('SELECT ReservationID, UserID, ReservationDate, ReservationTime, ReservationSite, Status FROM Reservations')
            results = cursor.fetchall()
            cursor.close()
            connection.close()
            return results
        except mysql.connector.Error as err:
            print(f"Error: {err}")

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
            print(f"Error: {err}")

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
            print(f"Error: {err}")


@app.route('/')
def index():
    write_to_Users('mel.id', 'mlss_riri', 'melaixrio@gmail.com', 'Melaissa Rioveros', '2003-03-05', 'Female', 'Adamson University')
    return jsonify({'User Data': Users()})

if __name__ == '__main__':
    app.run(host='0.0.0.0')
