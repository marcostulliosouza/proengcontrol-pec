from flask import Blueprint, request, jsonify;
from flask_cors import CORS;
import mysql.connector;

autentication = Blueprint('autentication', __name__);
cors = CORS(autentication, origins='*');

mydb = mysql.connector.connect(
    host="10.161.100.11",
    user="bct_write",
    password="bcwriter22",
    database="better_call_test"
);

@autentication.route("/autentication", methods=['POST'])
def login():
    data = request.json
    username = data['username'];
    password = data['password'];

    cursor = mydb.cursor();
    cursor.execute("SELECT * FROM colaboradores WHERE col_login=%s AND col_senha=MD5(%s)", (username, password));
    user = cursor.fetchone();
    cursor.close();

    if user:
        return jsonify({'message': 'Login bem-sucedido'});
    else:
        return jsonify({'error': 'Credenciais inválidas'}), 401;
