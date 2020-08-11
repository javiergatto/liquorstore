import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadModules, postAgentModule, deleteAgentModule, updateAgent } from '../actions/agents';

class AgentModules extends Component {

  handleChange = (event) => {

    this.props.updateAgent({ [event.target.name]: (event.target.value !== "") ? event.target.value : null });
    this.props.postAgentModule();
    event.target.value = "";
  }

  componentWillMount(){
    if(this.props.modules.length === 0){
        this.props.loadModules();
    }
  }

  postAction = (event) => {
    event.preventDefault();
    this.props.postAgentModule();
  }

  render() {
    const used_modules_ids = this.props.agent_modules.map(module => { return module.id } )
    const unused_modules = this.props.modules.filter(module => !used_modules_ids.includes(module.id))

    return (
      <div className="component">
        {unused_modules.length ?
        <form>
            <p>
            Add Module
            </p>
            <select name="selected_module_id" onChange={this.handleChange}>
                <option value="">Select Module</option>
             {unused_modules.map((module, ind) => (
                <option value={module.id}>{module.name}</option>
             ))}
            </select>
        </form>
        : null}


        {this.props.agent_modules.length ? "" : "No Modules in use!"}
        {this.props.agent_modules.map(module => (
        <div className="tile">
            <div>{module.name}</div>
            <div className="options">
              <div className="button" onClick={() => this.props.deleteAgentModule(module.id)}>Delete</div>
            </div>
        </div>
        ))}
      </div>

    );
  }

}


const mapStateToProps = state => {
    return {
        agent_id:state.agent.id,
        agent_modules: state.agent.modules,
        modules :state.modules.modules
    }
}

const mapDispatchToProps = dispatch => {
    return{
        loadModules: () => dispatch(loadModules()),
        postAgentModule: () => dispatch(postAgentModule()),
        deleteAgentModule: (id) => dispatch(deleteAgentModule(id)),
        updateAgent: (data) => dispatch(updateAgent(data)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentModules);
