import React, { Component } from 'react';
import { connect } from 'react-redux'
import { patchIntentContext } from '../actions/modules';

class IntentContextEditForm extends Component {

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
                    <textarea rows="1" name="text" onChange={this.handleChange} value={this.state.text} placeholder="Context Text" />
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
        onSubmit: (data) => dispatch(patchIntentContext(data))
    }
}

export default connect(null, mapDispatchToProps)(IntentContextEditForm);
