import React, { Component } from 'react';

import { connect } from 'react-redux'
import { loadModule, updateModule, patchModule } from '../actions/modules';
import ModuleIntent from './ModuleIntent';

class ModuleEditForm extends Component {

  componentWillMount(){
      if(this.props.id){
        this.props.loadModule(this.props.id)
      }else if(this.props.match.params.id){
        this.props.loadModule(this.props.match.params.id)
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
          <div className="list no-margin-padding-border">
            <div className="head padding-1-em">
                <b>Edit Module</b>
            </div>
            <div className="component padding-1-em">
                <form onSubmit={this.onSubmit}>
                    <div className="grid">
                        <div className="component">
                            <input type="text" name="name" onChange={this.handleChange} value={this.props.name} />
                            <div className="options">
                                <input type="submit" className="button" value="Save" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="head padding-1-em">
                <div>Intents</div>
                <div className="options">
                    <div className="button">Add</div>
                </div>
            </div>

            <div className="component">
                <div className="list">
                    {this.props.intents.map((intent, index) => (
                        <ModuleIntent intent={intent}/>
                    ))}
                </div>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        id :state.module.id,
        name :state.module.name,
        intents :state.module.intents
    }
}

const mapDispatchToProps = dispatch => {
    return{
        loadModule: (id) => dispatch(loadModule(id)),
        handleChange: (data) => dispatch(updateModule(data)),
        onSubmit: () => dispatch(patchModule())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleEditForm);
