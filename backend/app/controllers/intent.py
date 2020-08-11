from flask import render_template, request, flash, redirect, url_for, jsonify, abort

from app import db
from app.models import Intent

class controller(object):

    @staticmethod
    def create_action(kwargs=None):
        """Creates a Intent record

        :param kwargs: dictionary to override request form values
        :type kwargs: dict

        """

        try:

            if not kwargs:

                data = request.get_json().get('data',{})

                kwargs = {
                    "module_id" : data.get('module_id'),
                    "name" : data.get('name'),
                }

            model = Intent(**kwargs)

            model.insert()

            response = {
                "success" : True,
                "model" : model.format()
            }

            return jsonify(response)

        except:

            abort(422)

    @staticmethod
    def update_action(id, kwargs=None):
        """Update an Intent record

        :param id: record id
        :type id: int

        """

        if not kwargs:

            data = request.get_json().get('data',{})
            kwargs = {
                "name" : data.get('name')
            }

        model = Intent.query.filter(Intent.id == id).first_or_404()

        model.update(kwargs)

        response = {
            "success" : True,
            "result" : model.format()
        }

        return

    @staticmethod
    def delete_action(id):
        """Delete a Intent record

        :param id: record id
        :type id: int

        """

        model = Intent.query.filter(Intent.id == id).first_or_404()

        model.delete()

        response = {
            "success" : True
        }

        return jsonify(response)
