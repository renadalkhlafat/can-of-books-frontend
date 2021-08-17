import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import './BestBooks.css';
import { Container, Row, Button } from 'react-bootstrap';
import Books from './Books';
import BookFormModal from './BookFormModal';
class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksArray: [],
      name: '',
      description: '',
      status: '',
      showModal: false,
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

  updateName = (e) => this.setState({ name: e.target.value });
  updateDescription = (e) => this.setState({ description: e.target.value });
  updateStatus = (e) => this.setState({ status: e.target.value });
  openModal = () => this.setState({showModal: true});
  colseModal = () => this.setState({showModal: false});

  addBookHandler = async (e) => {
    e.preventDefault();

    const bodyData = {
      name: this.state.name,
      description: this.state.description,
      status: this.state.status,
      email: this.props.auth0.user.email,
    };

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/book`, bodyData).then((Response) => {
      this.setState({
        book: Response.data.book,
      });
    });
  };
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
          <Button
            onClick={this.openModal}
            variant='outline-secondary '
          >
            Add Book
          </Button>
        </Row>
        <Row className='justify-content-center m-5'>
          {this.state.booksArray && <Books books={this.state.booksArray} />}
        </Row>

        <BookFormModal
        handleClose={this.colseModal}
        show={this.state.showModal}
        updateName ={this.updateName}
        updateDescription={this.updateDescription}
        updateStatus={this.updateStatus}
        addBookHandler ={this.addBookHandler}
        />
      </Container>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
