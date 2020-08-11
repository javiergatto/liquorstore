import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteModule, navToModuleEditForm } from '../actions/modules';
import IntentResponse from './IntentResponse';
import IntentResponseCreateForm from './IntentResponseCreateForm';

class IntentResponsesList extends Component {

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
                    <div><b>Responses</b></div>
                    <div className="options">
                      {(this.props.responses.length) ?
                      <div className="button" onClick={() => this.flipListVisibility()}>{(!this.state.visibleList) ? "Show" : "Hide"}</div>
                      : null}
                      {(!this.state.visibleForm) ?
                      <div className="button" onClick={() => this.flipFormVisibility()}>Add</div>
                      : null}
                    </div>
                </div>
                {(this.state.visibleForm) ? <IntentResponseCreateForm intent_id={this.props.intent_id} /> : null}
                {(this.state.visibleList) ?
                    this.props.responses.reverse().map((response, index) => (
                        <IntentResponse
                         id={response.id}
                         text={response.text}
                         />
                    ))
                : null}
            </div>
        </div>
    );
  }
}

export default connect(null, null)(IntentResponsesList)
