import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteModule, navToModuleEditForm } from '../actions/modules';

class Module extends Component {

  deleteAction(id) {
    if(window.confirm('are you sure you want to delete the module?')) {
      this.props.deleteAction(id);
    }
  }

  render() {
    return (
      <div className="component">
        <div>{this.props.module.name}</div>
        <div className="options">
          <div className="button" onClick={() => this.props.editAction(this.props.module.id)}>Edit</div>
          <div className="button" onClick={() => this.deleteAction(this.props.module.id)}>Delete</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return{
        deleteAction: (id) => dispatch(deleteModule(id)),
        editAction: (id) => dispatch(navToModuleEditForm(id))

    }
}

export default connect(null, mapDispatchToProps)(Module)
