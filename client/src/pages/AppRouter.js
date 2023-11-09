// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './singup';
import Login from './login';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Redirect to="/signup" />
    </Switch>
  </Router>
);

export default AppRouter;
