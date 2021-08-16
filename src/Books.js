import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

class Books extends Component {
    render() {
        const { books } = this.props
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
                                        <small>{book.status}</small>
                                    </Carousel.Caption>
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