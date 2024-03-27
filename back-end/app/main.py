from flask import Flask;
from flask_cors import CORS;
from autentication import autentication;

app = Flask(__name__);
cors = CORS(app, origins='*');

# Registrar as rotas do módulo autentication
app.register_blueprint(autentication);

if __name__ == '__main__':
    app.run(debug=True)