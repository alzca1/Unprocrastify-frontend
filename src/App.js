import React, {Component} from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

import Navbar from './components/Navbar.js';
import PrivateRoute from './components/PrivateRoute.js';
import AnonRoute from './components/AnonRoute.js';


import Private from './pages/Private';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import TodoForm from './pages/TodoForm';
import ListForm from './pages/ListForm';
import UpdateTodoForm from './pages/UpdateTodoForm.js';



import AuthProvider from './contexts/auth-context.js';

import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <div className="container">
            {/* <h1 className="title">Unprocrastify</h1> */}
            <Navbar />
            <Switch>
              <AnonRoute path="/signup" component={Signup} />
              <AnonRoute path="/login" component={Login}  />
              <PrivateRoute path="/homepage" component={Homepage} />
              <PrivateRoute path="/task/:id/edit" component={UpdateTodoForm} />
              <PrivateRoute path="/todoform" component={TodoForm} />
              <PrivateRoute path="/listform" component={ListForm} />
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    )
  }
}

export default App;
