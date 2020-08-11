import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteModule, navToModuleEditForm } from '../actions/modules';
import IntentPatternsList from './IntentPatternsList';
import IntentResponsesList from './IntentResponsesList';
import IntentContextsList from './IntentContextsList';
import IntentDialogsList from './IntentDialogsList';

class ModuleIntent extends Component {

  constructor(props){
    super();
    this.state = {
      visibleList: false
    }
  }

  flipVisibility() {
    this.setState({visibleList: !this.state.visibleList});
  }

  deleteAction(id) {
    if(window.confirm('are you sure you want to delete this?')) {
      //this.props.deleteAction(id);
    }
  }

  render() {
    return (
      <div className="component">
        <div className="list no-margin-padding-border">
            <div className="head padding-1-em">
                <div>
                    <strong>{this.props.intent.name}</strong>
                </div>
                <div className="options">
                    <div className="button" onClick={() => this.flipVisibility()}>{this.state.visibleList ? "Hide" : "Show"}</div>
                    <div className="button" onClick={() => this.deleteAction(this.props.intent.id)}>Delete</div>
                </div>
            </div>
            {this.state.visibleList ?
                <IntentPatternsList patterns={this.props.intent.patterns} intent_id={this.props.intent.id} />
            : null}
            {this.state.visibleList ?
                <IntentResponsesList responses={this.props.intent.responses} intent_id={this.props.intent.id} />
            : null}
            {this.state.visibleList ?
                <IntentContextsList contexts={this.props.intent.contexts} intent_id={this.props.intent.id} />
            : null}
            {this.state.visibleList ?
                <IntentDialogsList dialogs={this.props.intent.dialogs} intent_id={this.props.intent.id} />
            : null}
        </div>
      </div>
      )
  }
}

const mapDispatchToProps = dispatch => {
    return{
        //deleteAction: (id) => dispatch(deleteIntentDialog(id)),
        //editAction: (id) => dispatch(navToIntentDialogEditForm(id))

    }
}

export default connect(null, mapDispatchToProps)(ModuleIntent)
