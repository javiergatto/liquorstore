import React, { Component } from 'react';
import { connect } from 'react-redux'
import { patchIntentDialog } from '../actions/modules';


class IntentDialogEditForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        id: this.props.id,
        name: this.props.name,
        slot: this.props.slot,
        input_type: this.props.input_type,
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
        name: this.state.name,
        slot: this.state.slot,
        input_type: this.state.input_type
    });
    event.target.reset();
  }

  render() {
    return (
      <div className="component">
        <form className="grid no-margin-padding-border" onSubmit={this.onSubmit}>
            <div className="component">
                <input type="text" name="name" onChange={this.handleChange} value={this.state.name} placeholder="Name"/>
                <input type="text" name="slot" onChange={this.handleChange} value={this.state.slot} placeholder="Slot"/>
                <input type="text" name="input_type" onChange={this.handleChange} value={this.state.input_type} placeholder="Input Type"/>
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
        onSubmit: (data) => dispatch(patchIntentDialog(data))
    }
}

export default connect(null, mapDispatchToProps)(IntentDialogEditForm);
