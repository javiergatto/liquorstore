import React, { Component } from 'react';
import { connect } from 'react-redux'
import { deleteIntentPattern } from '../actions/modules';
import IntentPatternEditForm from './IntentPatternEditForm';

class IntentPattern extends Component {

  constructor(props){
    super();
    this.state = {
      visibleForm: false
    }
  }
  flipVisibility() {
    this.setState({visibleForm: !this.state.visibleForm});
  }

  deleteAction() {
    if(window.confirm('are you sure you want to delete this?')) {
      this.props.deleteAction(this.props.id);
    }
  }

  render() {

    return (this.state.visibleForm) ?
    (<IntentPatternEditForm id={this.props.id} text={this.props.text}/>)
    : (
        <div className="component">
        <div onClick={() => this.flipVisibility()}>{this.props.text}</div>
            <div className="options">
              <div className="button" onClick={() => this.deleteAction()}>Delete</div>
            </div>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return{
        deleteAction: (id) => dispatch(deleteIntentPattern(id))
    }
}

export default connect(null, mapDispatchToProps)(IntentPattern)
