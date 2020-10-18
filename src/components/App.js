import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Loadable from 'react-loadable';

import Head from './Head';

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ './Home'),
  loading: () => <div>Loading...</div>
});

const App = () => {
  return (
    <div className="app">
      <Head />
      <main className="main">
        <Switch>
          <Route exact path="/" component={LoadableHome} />
        </Switch>
      </main>

      <footer>Developed by: Pankaj</footer>
    </div>);
};
export default App;
