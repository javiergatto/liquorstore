import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import './stylesheets/App.css';
import AgentCreateForm from './components/AgentCreateForm';
import AgentEditForm from './components/AgentEditForm';
import ModuleCreateForm from './components/ModuleCreateForm';
import ModuleEditForm from './components/ModuleEditForm';
import IntentForm from './components/IntentForm';
import AgentsList from './components/AgentsList';
import ModulesList from './components/ModulesList';
import Header from './components/Header';


class App extends Component {
  render() {
    return (
    <div className="App">
      <Header path />
      <Router>
        <Switch>
          <Route path="/" exact component={AgentsList} />
          <Route path="/agents" exact component={AgentsList} />
          <Route path="/agent/create" component={AgentCreateForm} />
          <Route path="/agent/:id/edit" component={AgentEditForm} />
          <Route path="/modules" exact component={ModulesList} />
          <Route path="/module/create" component={ModuleCreateForm} />
          <Route path="/module/:id/edit" component={ModuleEditForm} />
          <Route path="/intent/create" component={IntentForm} />
          <Route component={AgentsList} />
        </Switch>
      </Router>
    </div>
  );

  }
}

export default App;
