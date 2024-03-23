"""File defining workouts
"""
# ======== standard imports ========
from typing import Optional
from datetime import datetime
# ==================================

# ======= third party imports ======
# ==================================

# ======= SQLAlchemy imports =======
from sqlalchemy import ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship, validates
# ==================================

# ========= program imports ========
from odybackend.models.base import Base
# ==================================

class Workout(Base):
    '''
    Top level class representing a full workout.
    If you were at the gym for an hour (and documented everything),
    everything you did would be within this class.
    '''
    __tablename__ = 'workouts'

    # COLUMNS
    id:Mapped[int] = mapped_column(primary_key=True)
    user_id:Mapped[int] = mapped_column(ForeignKey('users.id'))
    date:Mapped[datetime]
    description:Mapped[Optional[str]]

    # RELATIONSHIPS
    exercise_blocks: Mapped[list['ExerciseBlock']] = relationship("ExerciseBlock", back_populates="workout")

    def __dictrepr__(self) -> tuple[dict[str, str], dict[str, str]]:
        basedict = {
            'ID': self.id,
            'User ID': self.user_id,
            'Date': self.date,
            'Description': self.description
        }
        nesteddict = {
            'Exercise Block '+str(i): block
            for i, block in enumerate(self.exercise_blocks)
        }
        return basedict, nesteddict

class ExerciseBlock(Base):
    '''
    Wrapper class for large groupings of exercises.
    If you were at the gym for an hour, you may have a
    warmup exercise block, compound lift + light acessory
    exercise block, heavy accessory exercise block, and 
    cooldown stretching exercise block.
    '''
    __tablename__ = 'exercise_blocks'

    # COLUMNS
    id:Mapped[int] = mapped_column(primary_key=True)
    name:Mapped[str]
    workout_id:Mapped[int] = mapped_column(ForeignKey('workouts.id'))

    # RELATIONSHIPS
    workout: Mapped[Workout] = relationship("Workout", back_populates="exercise_blocks", foreign_keys=[workout_id])
    exercises: Mapped[list['Exercise']] = relationship(back_populates="exercise_block")

    def __dictrepr__(self) -> tuple[dict[str, str], dict[str, str]]:
        basedict = {
            'ID':self.id, 
            'Workout ID': self.workout_id,
            'Name': self.name,
            
        }
        nesteddict = {
            'Exercise '+str(i):exercise.__repr__()
            for i, exercise in enumerate(self.exercises)
        }
        return basedict, nesteddict
    
class Exercise(Base):
    '''
    Class for any exercise. Note that this is not the set/round level,
    this is the repetition level. So even if you did 5 sets of 5 reps
    of bench-press with the same weight, you would construct 
    5 Exercises with the same attributes.
    '''
    __tablename__ = 'exercises'

    id:Mapped[int] = mapped_column(primary_key=True)
    exercise_type:Mapped[str] = mapped_column()
    exercise_block_id:Mapped[int] = mapped_column(ForeignKey('exercise_blocks.id'))

    _mapper_args__ = {
        'polymorphic_identity':'abstract_exercise',
        'polymorphic_on':exercise_type
    }

     # RELATIONSHIPS
    exercise_block: Mapped[ExerciseBlock] = relationship(
        back_populates="exercises", 
        foreign_keys=[exercise_block_id]
    )

    def __dictrepr__(self) -> tuple[dict[str, str], dict[str, str]]:
        basedict = {
            'ID':self.id,
            'Exercise Block ID':self.exercise_block_id,
            'Exercise Type':self.exercise_type,
        }
        nesteddict = {}
        return basedict, nesteddict
    
class Lift(Exercise):
    '''
    Class for lifting (?) based exercises
    '''
    __tablename__ = 'lifts'
    
    id:Mapped[int] = mapped_column(ForeignKey('exercises.id'), primary_key=True)
    lift_name:Mapped[str]
    weight:Mapped[float]
    reps:Mapped[int]
    _mapper_args__ = {
        'polymorphic_identity':'lift',
    }

    def __dictrepr__(self) -> tuple[dict[str, str], dict[str, str]]:
        basedict, nesteddict = super().__dictrepr__()
        basedict['Lift Name'] = self.lift_name
        basedict['Weight'] = self.weight
        basedict['Reps'] = self.reps
        return basedict, nesteddict

class FreeformAerobic(Exercise):
    '''
    Class for aerobic based exercises without internal interval
    '''
    __tablename__ = 'freeform_aerobic_exercises'
    
    id:Mapped[int] = mapped_column(ForeignKey('exercises.id'), primary_key=True)
    distance:Mapped[float]
    duration:Mapped[float]
    _mapper_args__ = {
        'polymorphic_identity':'freeform_aerobic_exercise',
    }

    def __dictrepr__(self) -> tuple[dict[str, str], dict[str, str]]:
        basedict, nesteddict = super().__dictrepr__()
        basedict['Distance'] = self.distance
        basedict['Duration'] = self.duration
        return basedict, nesteddict


class Run(FreeformAerobic):
    _mapper_args__ = {
        'polymorphic_identity':'run',
    }

class Swim(FreeformAerobic):
    
    __tablename__ = 'swims'
    
    SUPPORTED_STROKES = {'Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly'}
    
    id:Mapped[int] = mapped_column(ForeignKey('freeform_aerobic_exercises.id'), primary_key=True)
    stroke:Mapped[str]
    _mapper_args__ = {
        'polymorphic_identity':'swim',
    }

    @validates('stroke')
    def validate_stroke(self, key, arg):
        assert arg in self.SUPPORTED_STROKES

    def __dictrepr__(self) -> tuple[dict[str, str], dict[str, str]]:
        basedict, nesteddict = super().__dictrepr__()
        basedict['Stroke'] = self.stroke
        return basedict, nesteddict