from flask import render_template, request, flash, redirect, url_for, jsonify, abort

from app import db
from app.models import Module


MODULES_PER_PAGE = 10

class controller(object):

    @staticmethod
    def create_action(kwargs=None):
        """Creates a Module record

        :param kwargs: dictionary to override request form values
        :type kwargs: dict

        """

        try:

            if not kwargs:

                values = request.get_json()

                kwargs = {
                    "name" : values.get('name'),
                    "description" : values.get('description')
                }

            model = Module(**kwargs)

            model.insert()

            response = {
                "success" : True,
                "result" : model.format()
            }

            return jsonify(response)

        except:

            abort(422)

    @staticmethod
    def update_action(id, kwargs=None):
        """Update an Module record

        :param id: record id
        :type id: int

        """

        if not kwargs:

            data = request.get_json().get('data',{})
            kwargs = {
                "name" : data.get('name')
            }

        model = Module.query.filter(Module.id == id).first_or_404()

        model.update(kwargs)

        response = {
            "success" : True,
            "result" : model.format()
        }

        return jsonify(response)

    @staticmethod
    def get_action(id):
        """Get an Module record

        :param id: record id
        :type id: int

        """

        model = Module.query.filter(Module.id == id).first_or_404()

        response = {
            "success" : True,
            "result" : model.format()
        }

        return jsonify(response)

    @staticmethod
    def delete_action(id):
        """Delete a Module record

        :param id: record id
        :type id: int

        """

        model = Module.query.filter(Module.id == id).first_or_404()

        model.delete()

        response = {
            "success" : True
        }

        return jsonify(response)

    @staticmethod
    def list_json(page=None, all=False):
        """Returns json of a list of Module records

        :param page: page number
        :param all: paginate records
        :type page: int
        :type all: bool

        """

        try:
            if not all:

                if not page:

                    page = request.args.get('page', 1, type=int)

                models = Module.query.paginate(page=page, per_page=MODULES_PER_PAGE)

            else:

                models = Module.query.get()


            if not models.items:

                abort(404)

            results = {
                "success":True,
                "results": [model.format() for model in models.items],
                "total_results": Module.query.count()
            }

            return jsonify(results)

        except:

            abort(422)

    @staticmethod
    def search_json(payload={}):
        """Returns json of a list of Module search records

        :param payload: payload dict
        :param page: page number
        :type search: str
        :type page: int

        """

        if not payload:

            payload = request.get_json()
            page = payload.get('page', request.args.get('page', 1))

        search = payload.get('searchTerm', '')

        query = Module.query.filter(Module.name.ilike("%" + search + "%"))

        count = query.count()

        models = query.paginate(page=page, per_page=MODULES_PER_PAGE)

        if not models.items:

            abort(404)

        results = {
            "success":True,
            "results": [model.format() for model in models.items],
            "total_results": count
        }

        return jsonify(results)

