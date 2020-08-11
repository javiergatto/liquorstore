from app import db

from sqlalchemy import VARCHAR, CHAR, Column, DateTime, Float, ForeignKey, String, Text, text
from sqlalchemy.dialects.mysql import BIGINT, INTEGER, TINYINT
from sqlalchemy.orm import relationship

class Module(db.Model):

    __tablename__ = 'modules'

    id = db.Column(BIGINT(20), primary_key=True, unique=True)
    name = db.Column(VARCHAR(255))


    def format(self):
        return {
            'id': self.id,
            'name': self.name,
            'intents': [model.format() for model in self.intents]
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
