from app import db

from sqlalchemy import VARCHAR, CHAR, Column, DateTime, Float, ForeignKey, String, Text, text
from sqlalchemy.dialects.mysql import BIGINT, INTEGER, TINYINT
from sqlalchemy.orm import relationship

class IntentDialog(db.Model):

    __tablename__ = 'intent_dialogs'

    id = Column(BIGINT(20), primary_key=True, unique=True)
    intent_id = Column(ForeignKey('intents.id'), nullable=False, index=True)
    name = Column(VARCHAR(255), nullable=False)
    slot = Column(VARCHAR(255))
    input_type = Column(CHAR(255))

    intent = relationship('Intent', backref=db.backref('dialogs'))

    def __init__(self, intent_id=None, name="", slot="", input_type=""):
        self.intent_id = intent_id
        self.name = name
        self.slot = slot
        self.input_type = input_type

    def format(self):
        return {
          'id': self.id,
          'name': self.name,
          'slot': self.slot,
          'input_type': self.input_type
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
