import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../components/withAuth.js';

class Signup extends Component {

  state = {
    username: '',
    email: '', 
    password: '',
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const email = this.state.email; 
    const password = this.state.password;

    this.props.signup({ username, email,  password })
      .then( (user) => {
        console.log(user)
        this.setState({
            username: '',
            email: '', 
            password: '',
        });
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    console.log(value)
    this.setState({[name]: value});
  }

  render() {
    const { username, email, password } = this.state;
    return (
      <>
      <section className="content">
      <div className="title">
          <h1 className="title">Unprocrastify</h1>
        </div>
        <div class-name="signup-page"> 
        <form onSubmit={this.handleFormSubmit}>
          <div className="input-box"> 
            <input className="input-text" id='username' type='text' name='username' value={username} onChange={this.handleChange} placeholder="Pick an username"/>
          </div>

          <div className="input-box">
            <input className="input-text" id='email' type='text' name='email' value={email} onChange={this.handleChange} placeholder="Insert your e-mail address"/>        
          </div>
          
          <div className="input-box">
            <input className="input-text" id='password' type='password' name='password' value={password} onChange={this.handleChange} placeholder="Pick an password"/>
          </div>

          <input className="btn-submit" type='submit' value='Signup' />
        </form>

        <p>Already have account? 
          <Link to={'/login'}> Login</Link>
        </p>
        </div>
      </section>

      </>
    )
  }
}

export default withAuth(Signup);