import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
import { Container, Navbar,Nav,Row } from 'react-bootstrap'
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import './Header.css';

class Header extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <Navbar  expand="lg" style={{background:"#59ceb4"}}>
        <Container>
          <Navbar.Brand><h1>My Favorite Books</h1></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
          <Row>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}</Row></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default withAuth0(Header);
