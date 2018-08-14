import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Provider }  from './context';
import Posts from './components/Posts';
import PostView from './components/PostView';
import AddPost from './components/AddPost';
import NotFound from './components/NotFound';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route exact path="/post/:id" component={PostView} />
            <Route exact path="/addpost" component={AddPost} />
            <Route component={NotFound} />
          </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
