import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import WeatherSearch from './containers/WeatherSearch/WeatherSearch';
import NotFound from './containers/WeatherSearch/NotFound';

class App extends Component {
  render() {

    return(
      <Router>
        <Switch>
          <Route path="/" exact component={WeatherSearch}/>
          <Route path="/404" exact component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App;
