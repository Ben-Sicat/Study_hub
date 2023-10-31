


from flask import Flask, request, jsonify
import mysql.connector #re install modules
# import psycopg2

app = Flask(__name__)



mysql_connection = mysql.connector.connect(
    host='brain_and_brew',
    user='brain_and_brew',
    password='utotnijc',
    database='bnb'
)

# route funtion template
@app.route('/', methods=['GET'])#replace with actual link
def get_mysql_data():
    cursor = mysql_connection.cursor()
    cursor.execute('SELECT * FROM User') #replace with actual table
    data = cursor.fetchall()
    cursor.close()
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)#repace with host and port of server upon deployment