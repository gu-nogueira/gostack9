import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';

import ScrollToTop from './ScrollToTop';

import Login from '../pages/Login';
import Register from '../pages/Register';

import Deliveries from '../pages/Deliveries';
import Deliverymen from '../pages/Deliverymen';
import Recipients from '../pages/Recipients';
import Problems from '../pages/Problems';

function Routes() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />

        <Route path="/deliveries" exact component={Deliveries} isPrivate />
        <Route path="/deliverymen" component={Deliverymen} isPrivate />
        <Route path="/recipients" component={Recipients} isPrivate />
        <Route path="/problems" component={Problems} isPrivate />

        {/* 404 Page */}

        <Route path="*" component={() => <Redirect to="/" />} />
      </Switch>
    </>
  );
}

export default Routes;
