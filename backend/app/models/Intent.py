from app import db

from sqlalchemy import VARCHAR, CHAR, Column, DateTime, Float, ForeignKey, String, Text, text
from sqlalchemy.dialects.mysql import BIGINT, INTEGER, TINYINT
from sqlalchemy.orm import relationship

class Intent(db.Model):

    __tablename__ = 'intents'

    id = Column(BIGINT(20), primary_key=True, unique=True)
    name = Column(VARCHAR(255), nullable=False)
    module_id = Column(ForeignKey('modules.id'), index=True)

    module = relationship('Module', backref=db.backref('intents'))

    def __init__(self, name="", module_id=None):
        self.module_id = module_id
        self.name = name

    def format(self):
        return {
            'id': self.id,
            'name': self.name,
            'contexts': [model.format() for model in self.contexts],
            'dialogs': [model.format() for model in self.dialogs],
            'patterns': [model.format() for model in self.patterns],
            'responses': [model.format() for model in self.responses]
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
