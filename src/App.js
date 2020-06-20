/*
 * @file: App.js
 * @description: Configure App component to handle all routing
 * @author: Megha Sethi
 * */
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import NotFound from './Components/NotFound';
import PrivateRoute from "./AppRoute/PrivateRoute";
import NonPrivateRoute from "./AppRoute/NonPrivateRoute";
import SignIn from './Containers/SignIn';
import Albums from './Containers/Albums';
import { connect } from "react-redux";

function App(props) {
  const { user } = props;
    return (
      <Switch>
        {/* Non private routes */}
        <NonPrivateRoute exact path="/" component={SignIn} authorized = {user.authorized} />     
        {/* Private routes */}
        <PrivateRoute
          exact
          path="/my-albums"
          component={Albums}
          authorized = {user.authorized}
        />
        {/* 404 */}
        <Route path='*' component={NotFound} />
        
      </Switch>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(App);