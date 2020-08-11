from flask import Blueprint, render_template, request, flash, redirect, url_for

from app.controllers import IntentResponseController

blueprint = Blueprint('intent_response', __name__)
controller = IntentResponseController()

@blueprint.route('/intent/responses', methods=['POST'])
def create_action():
    '''
    An endpoint to POST a new intent response.

    '''

    return controller.create_action()

@blueprint.route('/intent/responses/<int:id>', methods=['PATCH'])
def update_action(id):
    '''
    An endpoint to PATCH intent response using a id.

    '''

    return controller.update_action(id)

@blueprint.route('/intent/responses/<int:id>', methods=['DELETE'])
def delete_action(id):
    '''
    An endpoint to DELETE intent response using a id.

    '''

    return controller.delete_action(id)
