import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './Pages/Main';
import Repository from './Pages/Repository';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/repository/:repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
