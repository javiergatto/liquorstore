from flask import Blueprint, render_template, request, flash, redirect, url_for

from app.controllers import IntentDialogController

blueprint = Blueprint('intent_dialog', __name__)
controller = IntentDialogController()

@blueprint.route('/intent/dialogs', methods=['POST'])
def create_action():
    '''
    An endpoint to POST a new intent dialog.

    '''

    return controller.create_action()

@blueprint.route('/intent/dialogs/<int:id>', methods=['PATCH'])
def update_action(id):
    '''
    An endpoint to PATCH intent dialog using a id.

    '''

    return controller.update_action(id)

@blueprint.route('/intent/dialogs/<int:id>', methods=['DELETE'])
def delete_action(id):
    '''
    An endpoint to DELETE intent dialog using a id.

    '''

    return controller.delete_action(id)
