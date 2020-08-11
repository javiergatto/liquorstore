import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteModule, navToModuleEditForm } from '../actions/modules';
import IntentDialog from './IntentDialog';
import IntentDialogCreateForm from './IntentDialogCreateForm';

class IntentDialogsList extends Component {

  constructor(props){
    super();
    this.state = {
      visibleForm: false,
      visibleList: false

    }
  }
  flipListVisibility() {
    this.setState({visibleList: !this.state.visibleList});
  }

  flipFormVisibility() {
    this.setState({visibleForm: !this.state.visibleForm});
  }

  render() {

    return (
        <div className="component">
            <div className="list">
                <div className="head">
                    <div><b>Dialogs</b></div>
                    <div className="options">
                      {(this.props.dialogs.length) ?
                      <div className="button" onClick={() => this.flipListVisibility()}>{(!this.state.visibleList) ? "Show" : "Hide"}</div>
                      : null}
                      {(!this.state.visibleForm) ?
                      <div className="button" onClick={() => this.flipFormVisibility()}>Add</div>
                      : null}
                    </div>
                </div>
                {(this.state.visibleForm) ? <IntentDialogCreateForm intent_id={this.props.intent_id} /> : null}
                {(this.state.visibleList) ?
                    this.props.dialogs.reverse().map((dialogs, index) => (
                        <IntentDialog
                         id={dialogs.id}
                         name={dialogs.name}
                         slot={dialogs.slot}
                         input_type={dialogs.input_type}
                         />
                    ))
                : null}
            </div>
        </div>
    );
  }
}

export default connect(null, null)(IntentDialogsList)
