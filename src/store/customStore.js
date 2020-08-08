import { reducer } from './reducer';
function createStore (reducer) {
  let state;
  const listeners = []

  function getState( ) {
    return state;
  }

  function dispatch (action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++)  {
      listeners[i]();
    }
  }

  function subscribe (callback) {
    listeners.push(callback)
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}

export default createStore( reducer );