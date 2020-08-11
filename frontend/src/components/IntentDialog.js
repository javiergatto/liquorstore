import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteIntentDialog } from '../actions/modules';
import IntentDialogEditForm from './IntentDialogEditForm';

class IntentDialog extends Component {

  constructor(props){
    super();
    this.state = {
      visibleForm: false
    }
  }

  flipVisibility() {
    this.setState({visibleForm: !this.state.visibleForm});
  }

  deleteAction() {
    if(window.confirm('are you sure you want to delete this?')) {
      this.props.deleteAction(this.props.id);
    }
  }

  render() {
    return (this.state.visibleForm) ?
    (<IntentDialogEditForm
        id={this.props.id}
        name={this.props.name}
        slot={this.props.slot}
        input_type={this.props.input_type}/>)
    : (
      <div className="component">
        <div onClick={() => this.flipVisibility()}>{this.props.name}</div>
        <div onClick={() => this.flipVisibility()}>{this.props.slot}</div>
        <div onClick={() => this.flipVisibility()}>{this.props.input_type}</div>
        <div className="options">
          <div className="button" onClick={() => this.deleteAction()}>Delete</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return{
        deleteAction: (id) => dispatch(deleteIntentDialog(id))

    }
}

export default connect(null, mapDispatchToProps)(IntentDialog)
