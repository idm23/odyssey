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
from odybackend.models.workout import Workout
from odybackend.database import Session
# ==================================

WORKOUT_BP = Blueprint('workout', __name__)

@WORKOUT_BP.route('/workout', methods=['POST'])
def add_workout():
    session = Session()
    data = request.json
    workout = Workout(
        user_id=data['user_id'],
        date=data['date'],
        description=data['description']
    )
    session.add(workout)
    session.commit()
    return jsonify({'message': 'Workout added successfully'}), 201

@WORKOUT_BP.route('/workouts/<int:user_id>', methods=['GET'])
def get_workouts(user_id):
    session = Session()
    workouts = session.query(Workout).filter_by(user_id=user_id).all()
    workout_data = []
    for workout in workouts:
        blocks = []
        for block in workout.exercise_blocks:
            exercises = []
            for exercise in block.exercises:
                exercises.append({
                    'type': exercise.exercise_type,
                    'details': exercise.__dictrepr__()
                })
            blocks.append({
                'name': block.name,
                'exercises': exercises
            })
        workout_data.append({
            'id': workout.id,
            'date': workout.date,
            'description': workout.description,
            'blocks': blocks
        })
    return jsonify(workout_data), 200
