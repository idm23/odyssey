"""File defining postgre schema
"""
# ======== standard imports ========
from time import sleep
# ==================================

# ======= third party imports ======
# ==================================

# ======= SQLAlchemy imports =======
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
# ==================================

# ========= program imports ========
from odybackend.models.base import Base
from odybackend.models.user import *
from odybackend.models.workout import *
# ==================================

sleep(10)
engine = create_engine('postgresql://user:password@postgres/mydatabase')
session_factory = sessionmaker(bind=engine)
Base.metadata.create_all(engine)
Session = scoped_session(session_factory)
