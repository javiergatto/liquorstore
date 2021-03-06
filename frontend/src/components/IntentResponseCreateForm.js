import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createIntentResponse } from '../actions/modules';

class IntentResponseCreateForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        text: this.props.text,
        modified: false
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value , modified:true});
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({text:this.state.text, intent_id:this.props.intent_id});
    event.target.reset();
  }

  render() {
    return (
      <div className="component">
        <form className="grid no-margin-padding-border" onSubmit={this.onSubmit}>
            <div className="component">
                <div>
                    <textarea rows="1" name="text" onChange={this.handleChange} value={this.state.text} placeholder="Response Text" />
                </div>
                <div className="options">
                { this.state.modified ?
                    <input type="submit" className="button" value="Save" />
                : null }
                </div>
            </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return{
        onSubmit: (data) => dispatch(createIntentResponse(data))
    }
}

export default connect(null, mapDispatchToProps)(IntentResponseCreateForm);
