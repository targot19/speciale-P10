import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ScreenRecording from "./ScreenRecording";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ScreenRecording} />
      <Route path="/screenrecording" component={ScreenRecording} />
    </Switch>
  </BrowserRouter>
);

export default Router;