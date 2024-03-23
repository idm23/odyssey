"""File defining core app
"""
# ======== standard imports ========
# ==================================

# ======= third party imports ======
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
# ==================================

# ======= SQLAlchemy imports =======
# ==================================

# ========= program imports ========
from odybackend.models.base import Base
from odybackend.models.user import User
from odybackend.database import Session
# ==================================

AUTH_BP = Blueprint('auth', __name__)

@AUTH_BP.route('/signup', methods=['POST'])
def signup():
    session = Session()
    data = request.json
    email=data['email']
    existing_user = session.query(User).filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'Email already exists'}), 409
    user = User(
        email=email,
        username=data['username'],
        password_hash=generate_password_hash(data['password']),
        first_name=data['first_name'],
        last_name=data['last_name']
    )
    session.add(user)
    session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@AUTH_BP.route('/login', methods=['POST'])
def login():
    session = Session()
    data = request.json
    user = session.query(User).filter_by(username=data['username']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        return jsonify({'message': 'Login successful', 'user_id': user.id}), 200
    return jsonify({'message': 'Invalid credentials'}), 401
