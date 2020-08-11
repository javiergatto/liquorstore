from flask import render_template, request, flash, redirect, url_for, jsonify, abort

from app import db
from app.models import Agent, Module, AgentModule


AGENTS_PER_PAGE = 10

class controller(object):

    @staticmethod
    def create_action(kwargs=None):
        """Creates a Agent record

        :param kwargs: dictionary to override request form values
        :type kwargs: dict

        """

        try:

            if not kwargs:

                data = request.get_json().get('data',{})

                kwargs = {
                    "name" : data.get('name'),
                    "description" : data.get('description')
                }

            model = Agent(**kwargs)

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
        """Update an Agent record

        :param id: record id
        :type id: int

        """

        if not kwargs:

            data = request.get_json().get('data',{})
            kwargs = {
                "name" : data.get('name'),
                "description" : data.get('description')
            }

        model = Agent.query.filter(Agent.id == id).first_or_404()

        model.update(kwargs)

        response = {
            "success" : True,
            "result" : model.format()
        }

        return jsonify(response)

    @staticmethod
    def get_action(id):
        """Get an Agent record

        :param id: record id
        :type id: int

        """

        model = Agent.query.filter(Agent.id == id).first_or_404()

        response = {
            "success" : True,
            "result" : model.format()
        }

        return jsonify(response)

    @staticmethod
    def delete_action(id):
        """Delete an Agent record

        :param id: record id
        :type id: int

        """

        model = Agent.query.filter(Agent.id == id).first_or_404()

        model.delete()

        response = {
            "success" : True
        }

        return jsonify(response)

    @staticmethod
    def list_json(page=None):
        """Returns json of a list of Agent records

        :param page: page number
        :type page: int

        """

        if not page:

            page = request.args.get('page', 1, type=int)

        models = Agent.query.paginate(page=page, per_page=AGENTS_PER_PAGE)

        if not models.items:

            abort(404)

        results = {
            "results": [model.format() for model in models.items],
            "total_results": Agent.query.count()
        }

        return jsonify(results)

    @staticmethod
    def search_json(payload={}):
        """Returns json of a list of Agent search records

        :param payload: payload dict
        :param page: page number
        :type search: str
        :type page: int

        """

        if not payload:

            payload = request.get_json()
            page = payload.get('page', request.args.get('page', 1))

        search = payload.get('searchTerm', '')

        query = Agent.query.filter(Agent.question.ilike("%" + search + "%"))

        count = query.count()

        models = query.paginate(page=page, per_page=AGENTS_PER_PAGE)

        if not models.items:

            abort(404)

        results = {
            "results": [model.format() for model in models.items],
            "total_results": count
        }

        return jsonify(results)

    @staticmethod
    def add_agent_module_action(id, kwargs=None):
        """Update an AgentModule record

        :param id: record id
        :type id: int

        """

        if not kwargs:

            data = request.get_json().get('data',{})
            kwargs = {
                "agent_id" : id,
                "module_id" : data.get('module_id')
            }

        agent = Agent.query.filter(Agent.id == kwargs['agent_id']).first_or_404()
        module = Module.query.filter(Module.id == kwargs['module_id']).first_or_404()

        model = AgentModule.query.filter(AgentModule.agent_id == kwargs['agent_id'], AgentModule.module_id == kwargs['module_id']).first()

        if model is None:

            model = AgentModule(**kwargs)

            model.insert()

        response = {
            "success" : True,
            "result" : agent.format()
        }

        return jsonify(response)

    @staticmethod
    def delete_agent_module_action(agent_id, module_id):
        """DELETE an AgentModule record

        :param agent_id: agent record id
        :param module_id: module record id
        :type agent_id: int
        :type module_id: int

        """

        model = AgentModule.query.filter(AgentModule.agent_id == agent_id, AgentModule.module_id == module_id).first_or_404()

        model.delete()

        agent = Agent.query.filter(Agent.id == agent_id).first_or_404()

        response = {
            "success" : True,
            "result" : agent.format()
        }

        return jsonify(response)
