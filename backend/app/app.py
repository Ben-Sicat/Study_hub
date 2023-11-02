#!/usr/bin/python3

from flask import Flask, jsonify
import mysql.connector


app = Flask(__name__)

def write_to_employee_data(employee_name: str, title: str):
    config = {
        'user': 'root',
        'password': 'root',
        'host': 'db',
        'port': '3306',
        'database': 'employees'
    }
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    query = "INSERT INTO employee_data (Employee_Name, Title) VALUES (%s, %s)"
    values = (employee_name, title)
    cursor.execute(query, values)
    connection.commit()
    cursor.close()
    connection.close()

def employee_data():
    config = {
        'user': 'root',
        'password': 'root',
        'host': 'db',
        'port': '3306',
        'database': 'employees'
    }
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    cursor.execute('SELECT Employee_Name, Title FROM employee_data')
    results = cursor.fetchall()
    cursor.close()
    connection.close()
    return results

@app.route('/')
def index():
    write_to_employee_data("Siddharth Sharma","Analyst")
    return jsonify({'Employee Data': employee_data()})


if __name__ == '__main__':
    app.run(host='0.0.0.0')