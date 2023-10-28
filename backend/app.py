# this will containt code for the backend flask python code

from flask import Flask, request, jsonify
import mysql.connector 
import psycopg2

app = Flask(__name)


#mysql connect
mysql_connection = mysql.connector.connect(
    host='',
    user='',
    password='',
    database=''
)
#
#route funtion template
# @app.route('/mysql-data', methods=['GET'])replace with actual link
# def get_mysql_data():
#     cursor = mysql_connection.cursor()
#     cursor.execute('SELECT * FROM Table') replace with actual table
#     data = cursor.fetchall()
#     cursor.close()
#     return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)#repace with host and port of server upon deployment