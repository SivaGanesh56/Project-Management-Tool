import React from 'react';
import { Card } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';
import { useData } from '../store';
import { CONSTANTS } from '../store/constants';

const CardItem = ({ title, description, id, listID, index }) => {

    const [, dispatch] = useData();

    const handleDelete = () => {
        const isConfirmed = window.confirm('Are you sure to delete this item');
        if (isConfirmed) {
            dispatch({
                type: CONSTANTS.DELETE_ITEM,
                payload: {
                    listID,
                    id
                }
            })
        }
    }

    return (
        <Draggable draggableId={id} index={index}>
            {provided => (
                <div 
                    className="cardContainer"
                    ref={provided.innerRef}
                    { ...provided.draggableProps }
                    { ...provided.dragHandleProps }
                >
                <Card>
                    <Card.Header>
                        <div className="row">
                            <span>{title}</span>
                            <span 
                                className="ml-auto remove-icon"
                                onClick={handleDelete}
                            >
                                X
                            </span>
                        </div>
                    </Card.Header>
                    <Card.Body>{description}</Card.Body>
                </Card>
            </div>
            )}
        </Draggable>
    );
}

export default CardItem;
