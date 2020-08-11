from flask import Blueprint, render_template, request, flash, redirect, url_for

from app.controllers import IntentContextController

blueprint = Blueprint('intent_context', __name__)
controller = IntentContextController()

@blueprint.route('/intent/contexts', methods=['POST'])
def create_action():
    '''
    An endpoint to POST a new intent context.

    '''

    return controller.create_action()

@blueprint.route('/intent/contexts/<int:id>', methods=['PATCH'])
def update_action(id):
    '''
    An endpoint to PATCH intent context using a id.

    '''

    return controller.update_action(id)

@blueprint.route('/intent/contexts/<int:id>', methods=['DELETE'])
def delete_action(id):
    '''
    An endpoint to DELETE intent context using a id.

    '''

    return controller.delete_action(id)
