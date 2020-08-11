import React, { Component } from 'react';

import '../stylesheets/App.css';
import Agent from './Agent';
import { connect } from 'react-redux'
import { loadAgents } from '../actions/agents';

class AgentsList extends Component {

  componentWillMount() {
    this.props.loadAgents();
  }

  navTo = (uri) => (action) => {
    window.location.href = window.location.origin + uri;

  }

  render() {
    const {agents} = this.props;
    return (
      <div className="component">
        <h2>Agents</h2>
        <h3 onClick={this.navTo('/agent/create')}>Create Agent</h3>
        <div className="list">
          {agents.map((agent, ind) => (
            <Agent
              agent={agent}
            />
          ))}
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
    return {
        agents: state.agents.agents
    }
}

const mapDispatchToProps = dispatch => {
    return{
        loadAgents: () => dispatch(loadAgents())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentsList)
