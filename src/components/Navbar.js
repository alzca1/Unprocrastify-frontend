import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from './withAuth.js';

class Navbar extends Component {
  render() {  
    return (
      <div>
        {this.props.isLoggedIn ? (
          <>
            <p>Hello {this.props.user.username}!</p>
            <p onClick={this.props.logout}>Logout</p>

            <ul>
            
            <li><Link to='/homepage'>Home</Link></li>
            </ul>


          </>
        ) : null
        
        }
      </div>
    )
  }
}

export default withAuth(Navbar);


