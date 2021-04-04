import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';

const CardForm = ({ onSubmit }) => {

    const inputRef = useRef();
    const descriptionRef = useRef();


    const handleSubmit = (e) => {
        e.preventDefault();
        const title = inputRef.current.value;
        const description = descriptionRef.current.value;
        onSubmit({
            title,
            description
        });
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>

                <Form.Group id="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        ref={inputRef}
                        required
                    />
                </Form.Group>

                <Form.Group id="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        ref={descriptionRef}
                        rows={3}
                        required
                    />
                </Form.Group>

                <Button type="submit" className="w-100">Add Item</Button>
            </Form>
        </div>
    );
};

export default CardForm;
