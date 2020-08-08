import { createAction, createReducer } from '@reduxjs/toolkit';
import { last } from 'lodash';

// Action Creators
export const bugAdded = createAction('bugAdded');
export const bugResolved = createAction('bugResolved');
export const bugRemoved = createAction('bugRemoved');

// Reducer
let lastId = 0;
export default createReducer([], {
  // key --> actions and value --> functions (event => event handler)
  [bugAdded.type]: (bugs, action) => {
    bugs.push({
      id: ++lastId,
      description: action.payload.description,
      resolved: false
    });
  },
  [bugResolved.type]: (bugs, action)  => {
    const indexOfBugToResolve = bugs.findIndex(bug => bug.id === action.payload.id);
    bugs[indexOfBugToResolve].resolved = true;
  },
  [bugRemoved.type]: (bugs, action) => {
    bugs.filter(bug => bug.id !== action.payload.id)
  }
});

/* ------- MANUAL FORMAT OF CREATING A REDUCER -------------
export default function reducer(state = [], action) {
  switch (action.type) {
    case bugAdded.type:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false
        }
      ];
    case bugRemoved.type: 
      return state.filter(bug => bug.id !== action.payload.id)
    
    case bugResolved.type:
      return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, resolved: true})

      default:
      return state;
  }
}
*/