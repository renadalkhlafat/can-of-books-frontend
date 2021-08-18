import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import './BestBooks.css';
import { Col, Row, Button,Container } from 'react-bootstrap';
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
      updatedName: '',
      updatedDescription: '',
      updatedStatus: '',
      showCreateModal: false,
    };
  }

  componentDidMount = async () => {

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
            .then(axiosResults => {
              this.setState({ currentUser: axiosResults.data })
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }
    this.getCurrentBook();
  }

  getCurrentBook = async () => {
    const booksApi = `${process.env.REACT_APP_SERVER_URL}/book?email=${this.props.auth0.user.email}`
    axios.get(booksApi).then(response => {
      if (response.data[0].book) {
        // console.log(response)
        this.setState({ booksArray: response.data[0].book });
      }
    })
  }

  newName = (e) => this.setState({ name: e.target.value });
  newDescription = (e) => this.setState({ description: e.target.value });
  newStatus = (e) => this.setState({ status: e.target.value });
  updateName = (e) => this.setState({ updatedName: e.target.value });
  updateDescription = (e) => this.setState({ updatedDescription: e.target.value });
  updateStatus = (e) => this.setState({ updatedStatus: e.target.value });
  openCreateModal = () => this.setState({ showCreateModal: true });
  closeCreateModal = () => this.setState({ showCreateModal: false });

  addBookHandler = async (e) => {
    e.preventDefault();

    const bodyData = {
      name: this.state.name,
      description: this.state.description,
      status: this.state.status,
      email: this.props.auth0.user.email,
    };

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/book`, bodyData).then((Response) => {
      // console.log(Response.data);
      this.setState({
        booksArray: Response.data.book,
        showCreateModal: false
      });
    });
  };

  deleteBook = (id) => {
    let bookUrl = `${process.env.REACT_APP_SERVER_URL}/book/${id}?email=${this.props.auth0.user.email}`
    axios.delete(bookUrl).then(response => {
      // console.log(response.data)
      this.setState({
        booksArray: response.data.book,
      })
    })
    this.getCurrentBook();
  };

  updateBook = async (e, id) => {
    e.preventDefault();
    const bodyData = {
      name: this.state.updatedName,
      status: this.state.updatedStatus,
      description: this.state.updatedDescription,
      email: this.props.auth0.user.email,
    };
    let bookUrl = `${process.env.REACT_APP_SERVER_URL}/book/${id}`
    await axios.put(bookUrl, bodyData).then((response) => {
      this.setState({
        booksArray: response.data.book,
        showUpdateModal: false
      });
      console.log(this.state.booksArray);
    });
  };

  render() {
    return (
      <Container fluid>
        <Row className='justify-content-center m-5'>
          <Button
            onClick={this.openCreateModal}
            variant='outline-secondary '
          >
            Add Book
          </Button>
        </Row>
        <Container fluid>
          <Row>
            <Col>
              {this.state.booksArray &&
                <Books
                  books={this.state.booksArray}
                  deleteBook={this.deleteBook}
                  updateName={this.updateName}
                  updateDescription={this.updateDescription}
                  updateStatus={this.updateStatus}
                  updateBook={this.updateBook}
                />}
            </Col>
          </Row>
        </Container>

        <BookFormModal
          handleClose={this.closeCreateModal}
          show={this.state.showCreateModal}
          updateName={this.newName}
          updateDescription={this.newDescription}
          updateStatus={this.newStatus}
          addBookHandler={this.addBookHandler}
        />
      </Container>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
