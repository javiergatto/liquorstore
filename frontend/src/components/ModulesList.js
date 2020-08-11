import React, { Component } from 'react';

import Module from './Module';
import { connect } from 'react-redux'
import { loadModules } from '../actions/modules';

class ModulesList extends Component {

  componentWillMount() {
    this.props.loadModules();
  }

  navTo = (uri) => (action) => {
    window.location.href = window.location.origin + uri;
  }

  render() {
    return (
      <div className="component">
          <h2>Module</h2>
          <h3 onClick={this.navTo('/module/create')}>Create Module</h3>
          <div className="list">
          {this.props.modules.map((module, ind) => (
            <Module
              module={module}
            />
          ))}
          </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
    return {
        modules: state.modules.modules
    }
}

const mapDispatchToProps = dispatch => {
    return{
        loadModules: () => dispatch(loadModules())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModulesList)
