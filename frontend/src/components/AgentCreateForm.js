import React, { Component } from 'react';

import AgentModules from './AgentModules';
import { connect } from 'react-redux'
import { loadAgent, updateAgent, createAgent, patchAgent } from '../actions/agents';

class AgentCreateForm extends Component {

  handleChange = (event) => {
    this.props.handleChange({ [event.target.name]: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
    event.target.reset();
  }

  render() {
    return (
      <div className="component">
        <p>
          <h2>New Agent</h2>
        </p>
        <form id="add-agent-form" onSubmit={this.onSubmit}>
          <p>
            Name
            <br/>
            <input type="text" name="name" onChange={this.handleChange}/>
          </p>
          <p>
            Details
            <br/>
            <textarea rows="1" type="text" name="description" onChange={this.handleChange}></textarea>
          </p>
          <p>
            <input type="submit" className="button" value="Submit" />
          </p>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return{
        onSubmit: () => dispatch(createAgent()),
        handleChange: (data) => dispatch(updateAgent(data))
    }
}

export default connect(null, mapDispatchToProps)(AgentCreateForm);
