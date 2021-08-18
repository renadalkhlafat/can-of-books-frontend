import React, { Component } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import UpdateBookModal from './UpdateBookModal';

class Books extends Component {
    constructor() {
        super();
        this.state = {
            showUpdateModal: false,
        }
    }
    closeUpdateModal = () => this.setState({ showUpdateModal: false });
    render() {
        const {
            books,
            deleteBook,
            updateName,
            updateDescription,
            updateStatus,
            updateBook,
        } = this.props
        return (
            <>
                <Carousel>
                    {
                        books.map((book, index) => {
                            return (
                                <Carousel.Item key={index} >
                                    <img
                                        className="d-block w-100"
                                        src="https://cdn.wallpapersafari.com/8/77/LH7RTv.jpg"
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>{book.name}</h3>
                                        <p>{book.description}</p>
                                        <small>{book.status}</small><br />
                                        <Button
                                            className='m-3'
                                            variant='outline-light '
                                            onClick={() => { deleteBook(book._id) }}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            className='m-3'
                                            variant='outline-light '
                                            onClick={() => (this.setState({ showUpdateModal: true }))}
                                        >
                                            Update
                                        </Button>
                                    </Carousel.Caption>
                                    <UpdateBookModal
                                        show={this.state.showUpdateModal}
                                        handleClose={this.closeUpdateModal}
                                        updateBook={updateBook}
                                        updateName={updateName}
                                        updateDescription={updateDescription}
                                        updateStatus={updateStatus}
                                        id={book._id}
                                    />
                                </Carousel.Item>
                            )
                        })
                    }

                </Carousel>

            </>
        );
    }
}

export default Books;