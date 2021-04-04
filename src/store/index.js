import React, { createContext, useReducer, useContext } from 'react';
import { nanoid } from 'nanoid';
import Reducer from './Reducer';

const initialState = [
    {
        id: nanoid(),
        title: 'Test Page 1',
        cards: [
            {
                id: nanoid(),
                title: 'Test Card 1',
                description: 'Test Card-1 description'
            },
            {
                id: nanoid(),
                title: 'Test Card 2',
                description: 'Test Card-2 description'
            }
        ]
    },
    {
        id: nanoid(),
        title: 'Test Page 2',
        cards: [
            {
                id: nanoid(),
                title: 'Test Card 3',
                description: 'Test Card-3 description'
            },
            {
                id: nanoid(),
                title: 'Test Card 4',
                description: 'Test Card-4 description'
            }
        ]
    }
];

const DataContext = createContext(initialState);

export function useData() {
    return useContext(DataContext);
}

const Store = ({ children }) => {

    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <DataContext.Provider value={[state, dispatch]}>
            {children}
        </DataContext.Provider>
    );
};


export default Store;
