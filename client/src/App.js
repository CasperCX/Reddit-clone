import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Provider }  from './context';
import Modal from './components/Modal';
import Header from './components/layout/Header';
import Posts from './components/Posts';
import PostView from './components/PostView';
import AddPost from './components/AddPost';
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account';
import NotFound from './components/NotFound';
import AuthToggle from './components/AuthToggle';
import { Consumer } from './context';


//Check if logged in and set context state
//TODO TRY TO GET CONTEXT API IN THIS TOP LEVEL COMPONENT
export default class App extends Component {
  componentDidMount() {
    // const { dispatch } = this.props.context;
    const token = localStorage.getItem('token');
    
    if(token) {
      // dispatch({ type: 'AUTHENTICATED'})
    };
  }

  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route exact path="/r/:sub" component={Posts} />
            <Route exact path="/post/:id" component={PostView} />
            <Route exact path="/r/:sub/addpost" component={AddPost} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/account" component={Account} />
            <Route component={NotFound} />
          </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

// export default props => (
//   <Consumer>
//     {context => <App {...props} context={context} />}
//   </Consumer>
//   );

