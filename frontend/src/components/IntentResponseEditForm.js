import React, { Component } from 'react';
import { connect } from 'react-redux'
import { patchIntentResponse } from '../actions/modules';

class IntentResponseEditForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        id:this.props.id,
        text: this.props.text,
        modified: false
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value , modified:true});
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({
        id: this.props.id,
        text:this.state.text
    });
  }

  render() {
    return (
      <div className="component">
        <form className="grid no-margin-padding-border" onSubmit={this.onSubmit}>
            <div className="component">
                <div>
                    <textarea rows={this.state.text.split(/\r*\n/).length} name="text" onChange={this.handleChange} value={this.state.text} placeholder="Response Text" />
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
        onSubmit: (data) => dispatch(patchIntentResponse(data))
    }
}

export default connect(null, mapDispatchToProps)(IntentResponseEditForm);
