from flask import Blueprint, render_template, request, flash, redirect, url_for

from app.controllers import IntentPatternController

blueprint = Blueprint('intent_pattern', __name__)
controller = IntentPatternController()

@blueprint.route('/intent/patterns', methods=['POST'])
def create_action():
    '''
    An endpoint to POST a new intent pattern.

    '''

    return controller.create_action()

@blueprint.route('/intent/patterns/<int:id>', methods=['PATCH'])
def update_action(id):
    '''
    An endpoint to PATCH intent pattern using a id.

    '''

    return controller.update_action(id)

@blueprint.route('/intent/patterns/<int:id>', methods=['DELETE'])
def delete_action(id):
    '''
    An endpoint to DELETE intent pattern using a id.

    '''

    return controller.delete_action(id)
