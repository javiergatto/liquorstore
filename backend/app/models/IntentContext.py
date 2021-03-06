from app import db

from sqlalchemy import CHAR, Column, DateTime, Float, ForeignKey, String, Text, text
from sqlalchemy.dialects.mysql import BIGINT, INTEGER, TINYINT
from sqlalchemy.orm import relationship

class IntentContext(db.Model):

    __tablename__ = 'intent_contexts'

    id = Column(BIGINT(20), primary_key=True, unique=True)
    intent_id = Column(ForeignKey('intents.id'), index=True)
    text = Column(Text)

    intent = relationship('Intent', backref=db.backref('contexts'))

    def __init__(self, intent_id=None, text=""):
        self.intent_id = intent_id
        self.text = text

    def format(self):
        return {
          'id': self.id,
          'text': self.text
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

