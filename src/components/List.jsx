import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Droppable } from 'react-beautiful-dnd';
import CardForm from './CardForm';
import CardItem from './CardItem';
import { useData } from '../store';
import { CONSTANTS } from '../store/constants';

const List = ({ title, cards = [], listID }) => {

    const [show, setShow] = useState(false);
    const [, dispatch] = useData();

    const showModal = () => {

        const onSubmit = (item) => {
            setShow(false);
            dispatch({
                type: CONSTANTS.ADD_ITEM,
                payload: {
                    listID,
                    ...item
                }
            });
        };

        return (
            <>
                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header><h5>Add Item</h5></Modal.Header>
                    <Modal.Body>
                        <CardForm onSubmit={onSubmit} />
                    </Modal.Body>
                </Modal>
            </>
        );
    };

    const handleDelete = () => {
        const isConfirmed = window.confirm('Are you sure to delete this list');
        if (isConfirmed) {
            dispatch({
                type: CONSTANTS.DELETE_LIST,
                payload: {
                    listID,
                }
            });
        }
    };

    return (
        <Droppable droppableId={listID}>
            {(provided) => (
                <div 
                    className="listContainer"
                    ref={provided.innerRef}
                    { ...provided.droppableProps }
                >
                    <div className="row listHeader">
                        <h4>{title}</h4>
                        <span
                            className="ml-auto remove-icon"
                            onClick={handleDelete}
                        >
                            X
                    </span>
                    </div>
                    {
                        cards.map(({ title, description, id }, idx) => (
                            <CardItem
                                key={id}
                                id={id}
                                listID={listID}
                                index={idx}
                                title={title}
                                description={description}
                            />
                        ))
                    }
                    <button className="btn btn-primary" onClick={() => setShow(true)}>Add Item</button>
                    {show && showModal()}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default List;
