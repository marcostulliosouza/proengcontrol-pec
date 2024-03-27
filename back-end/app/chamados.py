from flask import Flask, jsonify, Blueprint;
from flask_cors import CORS
import mysql.connector

chamados = Blueprint('chamados', __name__);
cors = CORS(chamados, origins='*');

mydb = mysql.connector.connect(
    host="10.161.100.11",
    user="bct_write",
    password="bcwriter22",
    database="better_call_test"
);

@chamados.route('/api/dadoschamados', methods = ['GET'])
def get_dados():
    try:
        cursor = mydb.cursor(dictionary=True);
        cursor.execute("SELECT * FROM chamados ORDER BY cha_id DESC LIMIT 15");
        dados = cursor.fetchall();
        cursor.close();
    
        return jsonify(dados);
    except Exception as e:
        return jsonify({'erro': str(e)}), 500;