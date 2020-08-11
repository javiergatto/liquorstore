import React, { Component } from 'react';

import AgentModules from './AgentModules';
import { connect } from 'react-redux'
import { loadAgent, updateAgent, createAgent, patchAgent } from '../actions/agents';

class AgentEditForm extends Component {

  componentWillMount(){

      if(this.props.id){
        this.props.loadAgent(this.props.id)
      }else if(this.props.match.params.id){
        this.props.loadAgent(this.props.match.params.id)
      }

  }

  handleChange = (event) => {
    this.props.handleChange({ [event.target.name]: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit();
  }

  render() {
    return (
      <div className="component">
        <h2>Edit Agent</h2>
        <form onSubmit={this.onSubmit}>
          <p>
            Name
            <br/>
            <input type="text" name="name" onChange={this.handleChange} value={this.props.name} />
          </p>
          <p>
            Details
            <br/>
            <textarea rows="1" type="text" name="description" onChange={this.handleChange} value={this.props.description} />
          </p>
          <p>
            <input type="submit" className="button" value="Save" />
          </p>
        </form>

        <AgentModules
              agent_id={this.props.id}
              agent_modules={this.props.modules}
            />
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        id :state.agent.id,
        name :state.agent.name,
        description :state.agent.description,
        modules :state.agent.modules
    }
}

const mapDispatchToProps = dispatch => {
    return{
        loadAgent: (id) => dispatch(loadAgent(id)),
        handleChange: (data) => dispatch(updateAgent(data)),
        onSubmit: () => dispatch(patchAgent())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentEditForm);
