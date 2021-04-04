import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import List from './List';
import { useData } from '../store';
import { Button, Form, Modal } from 'react-bootstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import { CONSTANTS } from '../store/constants';


const App = () => {

  const [state, dispatch] = useData();
  const [show, setShow] = useState(false);
  const inputRef = useRef();

  const showModal = () => {

    const handleSubmit = (e) => {
      e.preventDefault();
      setShow(false);
      const title = inputRef.current.value;
      dispatch({
        type: CONSTANTS.ADD_LIST,
        payload: {
          title
        }
      });
    };

    return (
      <Modal className="add-list-modal" show={show} onHide={() => setShow(false)}>
        <Modal.Header>Add List</Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="list">
            <Form.Label>Enter List Title</Form.Label>
            <Form.Control
              type="text"
              ref={inputRef}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100">Add List</Button>
        </Form>
      </Modal>
    );
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    dispatch({
      type: CONSTANTS.RE_ORDER,
      payload: {
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd:destination.index,
        draggableId
      }
    })

  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <h2 className="pageTitle">Project Management Tool</h2>
        <button className="btn btn-primary add-list" onClick={() => setShow(true)}>ADD LIST</button>
        <div className="container">
          {
            state.length > 0 && state.map(({ id, title, cards }) => (
              <List
                key={id}
                title={title}
                cards={cards}
                listID={id}
              />
            ))
          }
        </div>
        {show && showModal()}
      </div>
    </DragDropContext>
  );
};

export default App;
