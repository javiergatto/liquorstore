import React, { Component } from 'react';

class Header extends Component {

  navTo(uri){
    window.location.href = window.location.origin + uri;
  }

  render() {
    return (
      <div className="header">
        <div onClick={() => {this.navTo('')}}>Agents List</div>
        <div onClick={() => {this.navTo('/agent/create')}}>Create Agent</div>
        <div onClick={() => {this.navTo('/modules')}}>Modules List</div>
        <div onClick={() => {this.navTo('/module/create')}}>Create Module</div>
        <div onClick={() => {this.navTo('/intent/create')}}>Create Intent</div>
      </div>
    );
  }
}

export default Header;


