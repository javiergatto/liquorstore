import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createIntentPattern } from '../actions/modules';


class IntentPatternCreateForm extends Component {

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
    this.setState({
        text: "",
        modified: false
    });
    event.target.reset();
  }

  render() {
    return (
      <div className="component">
        <form className="grid no-margin-padding-border" onSubmit={this.onSubmit}>
            <div className="component">
                <textarea rows="1" name="text" onChange={this.handleChange} value={this.state.text} placeholder="Pattern Text" />
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
        onSubmit: (data) => dispatch(createIntentPattern(data))
    }
}

export default connect(null, mapDispatchToProps)(IntentPatternCreateForm);
