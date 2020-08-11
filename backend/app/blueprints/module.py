from flask import Blueprint, render_template, request, flash, redirect, url_for

from app.controllers import ModuleController

blueprint = Blueprint('module', __name__)
controller = ModuleController()

@blueprint.route('/modules', methods=['POST'])
def create_action():
    '''
    An endpoint to POST a new `module.

    :param name: name text
    :param description: description text
    :type name: str
    :type description: str

    '''

    return controller.create_action()

@blueprint.route('/modules/<int:module_id>', methods=['PATCH'])
def update_action(module_id):
    '''
    An endpoint to PATCH module using a module ID.

    '''

    return controller.update_action(module_id)

@blueprint.route('/modules/<int:module_id>', methods=['DELETE'])
def delete_action(module_id):
    '''
    An endpoint to DELETE module using a module ID.

    '''

    return controller.delete_action(module_id)

@blueprint.route('/modules/<int:module_id>', methods=['GET'])
def get_action(module_id):
    '''
    An endpoint to GET module using a module ID.

    '''

    return controller.get_action(module_id)

@blueprint.route('/modules')
def list_json():
    '''
    An endpoint to handle GET requests for modules,
    including pagination (every 10 modules).

    Returns a list of modules, number of total modules.
    '''


    return controller.list_json()

@blueprint.route('/modules/search', methods=['POST'])
def search_json():
    '''
    A POST endpoint to get modules based on a search term.

    Returns any modules for whom the search term
    is a substring of the module.
    '''

    return controller.search_json()
