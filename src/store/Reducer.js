import { nanoid } from 'nanoid';
import { CONSTANTS } from './constants';

const Reducer = (state, action) => {
    const { ADD_ITEM, ADD_LIST, DELETE_ITEM, DELETE_LIST, RE_ORDER, UPDATE_STATE } = CONSTANTS;
    switch (action.type) {
        case ADD_ITEM:
            const { listID, title, description } = action.payload;
            const newItem = {
                id: nanoid(),
                title,
                description
            };
            const newState = state.map(list => {
                if (list.id === listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newItem]
                    };
                } else {
                    return list;
                }
            });
            return newState;
        case ADD_LIST: {
            const { title } = action.payload;
            const newList = {
                id: nanoid(),
                title,
                cards: []
            };
            return [...state, newList];
        }
        case DELETE_ITEM: {
            const { listID, id } = action.payload;
            const newState = state.map((list, index) => {
                if (list.id === listID) {
                    const modifiedCards = [ ...list.cards ];
                    const idx = modifiedCards.findIndex(card => card.id === id);
                    modifiedCards.splice(idx, 1);
                    return {
                        ...list,
                        cards: modifiedCards
                    };
                } else {
                    return list;
                }
            });
            return newState;
        }
        case DELETE_LIST: {
            const newState = [ ...state ];
            const { listID } = action.payload;
            const idx = state.findIndex(({ id }) => id === listID);
            newState.splice(idx, 1);
            return newState;
        }
        case RE_ORDER: {
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                // draggableId
            } = action.payload;
            const newState = [ ...state ];
            if (droppableIdStart === droppableIdEnd) {
                const list = newState.find(list => droppableIdStart === list.id);
                const card = list.cards.splice(droppableIndexStart, 1);
                list.cards.splice(droppableIndexEnd, 0, ...card);
            } else {
                const sourceList = newState.find(list => list.id === droppableIdStart);
                const card = sourceList.cards.splice(droppableIndexStart, 1);
                const modifiedState = newState.map(list => {
                    if (list.id === droppableIdEnd) {
                        const { cards } = list;
                        const newCards = [ ...card, ...cards ];
                        return {
                            ...list,
                            cards: newCards
                        }
                    } else {
                        return list;
                    }
                });
                return modifiedState;
            }
            return newState;  
        }
        case UPDATE_STATE: {
            const { newState } = action.payload;
            return [ ...newState ];
        }
        default:
            return state;
    }
};

export default Reducer;