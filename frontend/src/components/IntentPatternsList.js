import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteModule, navToModuleEditForm } from '../actions/modules';
import IntentPattern from './IntentPattern';
import IntentPatternCreateForm from './IntentPatternCreateForm';

class IntentPatternsList extends Component {

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
                    <div><b>Patterns</b></div>
                    <div className="options">
                      {(this.props.patterns.length) ?
                      <div className="button" onClick={() => this.flipListVisibility()}>{(!this.state.visibleList) ? "Show" : "Hide"}</div>
                      : null}
                      {(!this.state.visibleForm) ?
                      <div className="button" onClick={() => this.flipFormVisibility()}>Add</div>
                      : null}
                    </div>
                </div>
                {(this.state.visibleForm) ? <IntentPatternCreateForm intent_id={this.props.intent_id} /> : null}
                {(this.state.visibleList) ?
                    this.props.patterns.reverse().map((pattern, index) => (
                        <IntentPattern
                         id={pattern.id}
                         text={pattern.text}
                         />
                    ))
                : null}
            </div>
        </div>
    );
  }
}


export default connect(null, null)(IntentPatternsList)
