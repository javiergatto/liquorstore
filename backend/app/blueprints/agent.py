from flask import Blueprint, render_template, request, flash, redirect, url_for

from app.controllers import AgentController

blueprint = Blueprint('agent', __name__)
controller = AgentController()

@blueprint.route('/agents', methods=['POST'])
def create_action():
    '''
    An endpoint to POST a new agent.

    :param agent: name text
    :param description: description text
    :type agent: str
    :type description: str

    '''

    return controller.create_action()

@blueprint.route('/agents/<int:agent_id>/modules', methods=['POST'])
def add_agent_module_action(agent_id):
    '''
    An endpoint to POST agent module using a agent ID.

    '''

    return controller.add_agent_module_action(agent_id)

@blueprint.route('/agents/<int:agent_id>/modules/<int:module_id>', methods=['DELETE'])
def delete_agent_module_action(agent_id, module_id):
    '''
    An endpoint to DELETE agent module using a agent ID and module ID.

    '''

    return controller.delete_agent_module_action(agent_id, module_id)

@blueprint.route('/agents/<int:agent_id>', methods=['PATCH'])
def update_action(agent_id):
    '''
    An endpoint to PATCH agent using a agent ID.

    '''

    return controller.update_action(agent_id)

@blueprint.route('/agents/<int:agent_id>', methods=['DELETE'])
def delete_action(agent_id):
    '''
    An endpoint to DELETE agent using a agent ID.

    '''

    return controller.delete_action(agent_id)

@blueprint.route('/agents/<int:agent_id>', methods=['GET'])
def get_action(agent_id):
    '''
    An endpoint to GET agent using a agent ID.

    '''

    return controller.get_action(agent_id)

@blueprint.route('/agents')
def list_json():
    '''
    An endpoint to handle GET requests for agents,
    including pagination (every 10 agents).

    Returns a list of agents, number of total agents.
    '''


    return controller.list_json()

@blueprint.route('/agents/search', methods=['POST'])
def search_json():
    '''
    A POST endpoint to get agents based on a search term.

    Returns any agents for whom the search term
    is a substring of the agent.
    '''

    return controller.search_json()
