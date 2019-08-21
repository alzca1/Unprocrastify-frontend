import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../components/withAuth';

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    this.props.login({ username, password })
    .then( (user) => {
      console.log(user)
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password } = this.state;
    return (
      <> 
      <section className="content">
        <div className="title">
          <h1 className="title">Unprocrastify</h1>
        </div>
        <div className="login-page">
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-box"> 
              {/* <label htmlFor='username' >Username:</label> */}
              <input className="input-text" id='username' type='text' name='username' value={username} onChange={this.handleChange} placeholder="username"/>
            </div>

            <div className="input-box"> 
              <input className="input-text" id='password' type='password' name='password' value={password} onChange={this.handleChange} placeholder="password" />   
            </div>
            <input className="btn-submit" type='submit' value='Login' />
          </form>
          <p>You don't have an accout yet?
            <Link to={'/signup'}> Signup</Link>
          </p>
        </div>
      </section>
      </>
    )
  }
}

export default withAuth(Login);