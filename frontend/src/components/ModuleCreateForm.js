import React, { Component } from 'react';

import { connect } from 'react-redux'
import { updateModule, createModule } from '../actions/modules';

class ModuleCreateForm extends Component {

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
        <p>
          <h2>New Module</h2>
        </p>
        <form onSubmit={this.onSubmit}>
          <p>
            Name
            <br/>
            <input type="text" name="name" onChange={this.handleChange}/>
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
        onSubmit: () => dispatch(createModule()),
        handleChange: (data) => dispatch(updateModule(data))
    }
}

export default connect(null, mapDispatchToProps)(ModuleCreateForm);
