import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';

import ScrollToTop from './ScrollToTop';

import Login from '../pages/Login';
import Register from '../pages/Register';

import Dashboard from '../pages/Dashboard';

function Routes() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />

        <Route path="/dashboard" component={Dashboard} isPrivate />

        {/* 404 Page */}

        <Route path="*" component={() => <Redirect to="/" />}></Route>
      </Switch>
    </>
  );
}

export default Routes;
