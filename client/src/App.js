import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import Posts from './components/Posts';
import AddPost from './components/AddPost';
import NotFound from './components/NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/addpost" component={AddPost} />
          <Route component={NotFound} />
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
