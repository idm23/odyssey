"""File defining core app
"""
# ======== standard imports ========
# ==================================

# ======= third party imports ======
from flask import Flask
from flask_cors import CORS
# ==================================

# ======= SQLAlchemy imports =======
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
# ==================================

# ========= program imports ========
from odybackend.models.base import Base
from odybackend.routes.auth import AUTH_BP
from odybackend.routes.workout import WORKOUT_BP
from odybackend.database import engine, Session
# ==================================

app = Flask(__name__)
CORS(app)
app.register_blueprint(AUTH_BP, url_prefix='/auth')
app.register_blueprint(WORKOUT_BP, url_prefix='/workout')

@app.route('/')
def home():
    return "Welcome to the Flask App"

@app.teardown_appcontext
def remove_session(*args, **kwargs):
    Session.remove()

if __name__ == '__main__':
    app.run(debug=True)