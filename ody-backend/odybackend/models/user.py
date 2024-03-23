"""File defining users
"""
# ======== standard imports ========
# ==================================

# ======= third party imports ======
# ==================================

# ======= SQLAlchemy imports =======
from sqlalchemy.orm import Mapped, mapped_column
# ==================================

# ========= program imports ========
from odybackend.models.base import Base
# ==================================

class User(Base):
    __tablename__ = 'users'

    id:Mapped[int] = mapped_column(primary_key=True)
    email:Mapped[str] = mapped_column(unique=True)
    username:Mapped[str] = mapped_column(unique=True)
    password_hash:Mapped[str]
    first_name:Mapped[str]
    last_name:Mapped[str]