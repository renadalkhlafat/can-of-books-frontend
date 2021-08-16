import React, { Component } from 'react';
import { withAuth0 } from "@auth0/auth0-react";
import { Card } from 'react-bootstrap';

class Profile extends Component {
    
    render() { 
        const { isAuthenticated } = this.props.auth0;
        const {name , email ,picture} = this.props.auth0.user
        return ( <div >
        {isAuthenticated && (
          <Card
            text="white"
            className="text-center p-3"
            style={{
              width: "35%",
              margin: "Auto",
              marginBottom: "30px",
              marginTop: "30px",
              backgroundColor: "#bedad4",
            }}
          >
            <Card.Img
              style={{ width: "100%" }}
              src={picture}
              alt={name}
              rounded
            />
            <Card.Body>
              <Card.Title style={{ color: "black" }}>{name}</Card.Title>
              <Card.Text style={{ color: "black" }}>{email}</Card.Text>
            </Card.Body>
          </Card>
        )}
      </div> );
    }
}
 
export default withAuth0(Profile);