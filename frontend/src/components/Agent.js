import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteAgent } from '../actions/agents';

class Agent extends Component {
  constructor(){
    super();
    this.state = {
      visibleDescription: false,
      agent: {}
    }
  }

  flipVisibility() {
    this.setState({visibleDescription: !this.state.visibleDescription});
  }

  deleteAction(id) {
    if(window.confirm('are you sure you want to delete the bot?')) {
      this.props.deleteAction(id);
    }
  }

  editAction = () => {
    let uri = '/agent/' + this.props.agent.id + '/edit';
    window.location.href = window.location.origin + uri;

  }

  render() {
    return (
      <div className="component">
      <div>{this.props.agent.name}</div>
        <div>
          <span style={{"visibility": this.state.visibleDescription ? 'visible' : 'hidden'}}>Description: {this.props.agent.description}</span>
        </div>
        <div className="options">
          <div className="button" onClick={() => this.flipVisibility()}>Show {this.state.visibleDescription ? 'Less' : 'More'}</div>
          <div className="button" onClick={() => this.editAction()}>Edit</div>
          <div className="button" onClick={() => this.deleteAction(this.props.agent.id)}>Delete</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return{
        deleteAction: (id) => dispatch(deleteAgent(id)),

    }
}

export default connect(null, mapDispatchToProps)(Agent)
