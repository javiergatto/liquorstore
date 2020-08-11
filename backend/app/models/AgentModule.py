from app import db

from sqlalchemy import CHAR, Column, DateTime, Float, ForeignKey, String, Text, text
from sqlalchemy.dialects.mysql import BIGINT, INTEGER, TINYINT
from sqlalchemy.orm import relationship

class AgentModule(db.Model):

    __tablename__ = 'agents_modules'

    id = Column(BIGINT(20), primary_key=True, unique=True)
    agent_id = Column(ForeignKey('agents.id'), index=True)
    module_id = Column(ForeignKey('modules.id'), index=True)

    agent = relationship('Agent', backref=db.backref('modules'))
    module = relationship('Module', backref=db.backref('agents'))

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
