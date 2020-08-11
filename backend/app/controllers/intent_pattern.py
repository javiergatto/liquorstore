from flask import render_template, request, flash, redirect, url_for, jsonify, abort

from app import db
from app.models import IntentPattern

class controller(object):

    @staticmethod
    def create_action(kwargs=None):
        """Creates a IntentPattern record

        :param kwargs: dictionary to override request form values
        :type kwargs: dict

        """


        if not kwargs:

            data = request.get_json().get('data',{})

            kwargs = {
                "intent_id" : data.get('intent_id'),
                "text" : data.get('text')
            }

        model = IntentPattern(**kwargs)

        model.insert()

        response = {
            "success" : True,
            "model" : model.format()
        }

        return jsonify(response)


    @staticmethod
    def update_action(id, kwargs=None):
        """Update an IntentPattern record

        :param id: record id
        :type id: int

        """

        if not kwargs:

            data = request.get_json().get('data',{})
            kwargs = {
                "text" : data.get('text')
            }

        model = IntentPattern.query.filter(IntentPattern.id == id).first_or_404()

        model.update(kwargs)

        response = {
            "success" : True,
            "result" : model.format()
        }

        return jsonify(response)

    @staticmethod
    def delete_action(id):
        """Delete a IntentPattern record

        :param id: record id
        :type id: int

        """

        model = IntentPattern.query.filter(IntentPattern.id == id).first_or_404()

        model.delete()

        response = {
            "success" : True
        }

        return jsonify(response)
