import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import './BestBooks.css';
import { Container, Row } from 'react-bootstrap';
import Books from './Books';
class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksArray: [],
    };
  }
  componentDidMount = () => {

    if (this.props.auth0.isAuthenticated) {
      this.props.auth0.getIdTokenClaims()
        .then(result => {
          const jwt = result.__raw;
          const config = {
            headers: { "Authorization": `Bearer ${jwt}` },
            method: 'get',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: '/test'
          }
          axios(config)
            .then(axiosResults => console.log(axiosResults.data))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }

    const booksApi = `${process.env.REACT_APP_SERVER_URL}/book?email=renadsalem8888@gmail.com`

    axios.get(booksApi).then(response => {
      console.log(response.data[0].book);
      this.setState({ booksArray: response.data[0].book });
    })
  }
  render() {
    return (
      <Container fluid  >
        <Row className='justify-content-center m-5'>
          <h1>My Favorite Books</h1>
        </Row>
        <Row className='justify-content-center mb-5'>
          <p>
            This is a collection of my favorite books
          </p>
        </Row>
        <Row className='justify-content-center m-5'>
          {this.state.booksArray && <Books books={this.state.booksArray} />}
        </Row>

      </Container>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
