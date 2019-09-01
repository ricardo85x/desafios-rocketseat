import React from "react";
import { Switch } from "react-router-dom";

import Route from './Route'

import SignIn from "~/pages/SignIn";
import SignUp from "~/pages/SignUp";
import Profile from "~/pages/Profile";
import Dashboard from "~/pages/Dashboard";
import New from "~/pages/New";
import Edit from "~/pages/Edit";
import Info from "~/pages/Info";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/new" component={New} isPrivate />
      <Route path="/edit/:id" component={Edit} isPrivate />
      <Route path="/info/:id" component={Info} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
