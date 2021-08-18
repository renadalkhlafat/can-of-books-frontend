import { Modal, Button ,Form} from 'react-bootstrap';
import React, { Component } from 'react';

class BookFormModal extends Component {
    render() {
        const {
            show,
            handleClose,
            updateName,
            updateDescription,
            updateStatus,
            addBookHandler
        } = this.props;
        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Book Form </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={addBookHandler}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter book name"
                                onChange={updateName} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Book Description</Form.Label>
                                <Form.Control as="textarea" placeholder="Enter Book Description" 
                                 rows={3}
                                 onChange={updateDescription}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book status</Form.Label>
                                <Form.Control type="text" placeholder="Enter book status (new or used)" 
                                onChange={updateStatus}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

        );
    }
}

export default BookFormModal;