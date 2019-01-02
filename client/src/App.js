import React from 'react';
import { Route, HashRouter as Router, Switch, Redirect } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <AppNavbar>
          <Switch>
            <Redirect exact path="/" to="/dashboard" />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/projects" component={ProjectList} />
            <Route exact path="/projects/:id" component={ProjectDetail} />
          </Switch>
        </AppNavbar>
      </Router>
    );
  }
}

export default App;
