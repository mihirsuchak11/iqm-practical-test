import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Questions from './pages/Questions/Questions';
import NotFound from './pages/NotFound/NotFound';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path='/' component={Questions} />
      <Route path='*' component={NotFound} />
    </Switch>
  );
};

export default Routes;
