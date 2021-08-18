import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import LoginButton from './LoginButton';
import './Login.css';

class Login extends React.Component {
  render() {
    return(
      <div style={{height:"100%",marginTop:"20rem"}}>
        <Card style={{ width: '20rem',background:"#bedad4" }}>
        <Card.Body>
          <Card.Title>Log In</Card.Title>
          <Card.Text>
            Click Below to Log In
          </Card.Text>
          {/* TODO: add a `LoginButton` component here that will log the user in with Auth0 */}
          <LoginButton/>
        </Card.Body>
      </Card>
      </div>
    )
  }
}

export default Login;
