import React, { Component } from 'react';
import $ from 'jquery';


class IntentForm extends Component {
  constructor(props){
    super();
    this.state = {
      name: ""
    }
  }

  componentDidMount(){
    return;
  }


  postAgent = (event) => {
    event.preventDefault();
    $.ajax({
      url: '/api/intents',
      type: "POST",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        name: this.state.name
      }),
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      success: (result) => {
        document.getElementById("add-intent-form").reset();
        return;
      },
      error: (error) => {
        alert('Unable to add intent. Please try your request again')
        return;
      }
    })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div className="component">
        <p>
          <h2>New Intent</h2>
        </p>
        <form id="add-intent-form" onSubmit={this.postAgent}>
          <p>
            Name
            <br/>
            <input type="text" name="name" onChange={this.handleChange}/>
          </p>
          <p>
            <input type="submit" className="button" value="Submit" />
          </p>
        </form>
      </div>
    );
  }
}

export default IntentForm;
