from app import db

from sqlalchemy import VARCHAR, CHAR, Column, DateTime, Float, ForeignKey, String, Text, text
from sqlalchemy.dialects.mysql import BIGINT, INTEGER, TINYINT
from sqlalchemy.orm import relationship

class Agent(db.Model):

    __tablename__ = 'agents'

    id = Column(BIGINT(20), primary_key=True, unique=True)
    name = Column(VARCHAR(255), unique=True)
    description = Column(Text)


    def __init__(self, name="", description=""):
        self.name = name
        self.description = description

    def format(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'modules': [model.module.format() for model in self.modules]
        }

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self, data={}):
        for field, value in data.items():
            setattr(self, field, value)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

