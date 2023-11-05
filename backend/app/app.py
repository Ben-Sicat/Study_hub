from flask import Flask, jsonify
import mysql.connector

app = Flask(__name__)

def get_db_connection():
    config = {
        'user': 'root',
        'password': 'root',
        'host': 'db',
        'port': '3306',
        'database': 'employees'
    }
    try:
        connection = mysql.connector.connect(**config)
        return connection
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

def write_to_employee_data(employee_name, title):
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor()
            query = "INSERT INTO employee_data (Employee_Name, Title) VALUES (%s, %s)"
            values = (employee_name, title)
            cursor.execute(query, values)
            connection.commit()
            cursor.close()
            connection.close()
        except mysql.connector.Error as err:
            print(f"Error: {err}")

def employee_data():
    connection = get_db_connection()
    if connection:
        try:
            cursor = connection.cursor(dictionary=True)
            cursor.execute('SELECT Employee_Name, Title FROM employee_data')
            results = cursor.fetchall()
            cursor.close()
            connection.close()
            return results
        except mysql.connector.Error as err:
            print(f"Error: {err}")

@app.route('/')
def index():
    write_to_employee_data("Siddharth Sharma", "Analyst")
    return jsonify({'Employee Data': employee_data()})

if __name__ == '__main__':
    app.run(host='0.0.0.0')
