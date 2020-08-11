from flask import Blueprint, render_template, request, flash, redirect, url_for

from app.controllers import IntentController

blueprint = Blueprint('intent', __name__)
controller = IntentController()

@blueprint.route('/intents', methods=['POST'])
def create_action():
    '''
    An endpoint to POST a new intent.

    '''

    return controller.create_action()

@blueprint.route('/intents/<int:id>', methods=['PATCH'])
def update_action(id):
    '''
    An endpoint to PATCH intent using a intent ID.

    '''

    return controller.update_action(id)

@blueprint.route('/intents/<int:id>', methods=['DELETE'])
def delete_action(id):
    '''
    An endpoint to DELETE intent using a intent ID.

    '''

    return controller.delete_action(id)
