import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './signup';
import Login from './login';
import Dashboard from './dashboard';
import AdminDashboard from './admin-dashboard';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Redirect to="/signup" />
    </Switch>
  </Router>
);

export default AppRouter;
