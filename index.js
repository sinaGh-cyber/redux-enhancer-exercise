const ADD_ICE_CREAM = 'ADD_ICE_CREAM';
const REMOVE_ICE_CREAM = 'REMOVE_ICE_CREAM';

const Redux = require('redux');
const createStore = Redux.createStore;
const applyMiddleware = Redux.applyMiddleware;

const iceCreamReducer = (iceCream = { qty: 0 }, { type, payLoad }) => {
  switch (type) {
    case ADD_ICE_CREAM: {
      return { qty: iceCream.qty + 1 };
    }
    case REMOVE_ICE_CREAM: {
      return { qty: iceCream.qty - 1 };
    }

    default:
      return iceCream;
  }
};

const loggerEnhancer = (createStore) => (reducer, initialState, enhancer) => {
  const loggerReducer = (state, action) => {
    console.log(`qty before '${action.type}' :`, state?.qty);
    const newState = reducer(state, action);
    console.log(`qty after: '${action.type}' :`, newState?.qty);
    return newState;
  };

  return createStore(loggerReducer, initialState, enhancer);
};

const logMiddleware = (store) => (next) => (action) => {
  console.log('old state: ', store.getState(), action.type);
  next(action);
  console.log('new state: ', store.getState(), action.type);
};

const monitorMiddleware = (store) => (next) => (action) => {
  const before =  performance.now();
  next(action);
  console.log( performance.now() - before);
};

const Store = createStore(iceCreamReducer, applyMiddleware(logMiddleware, monitorMiddleware));

Store.dispatch({ type: ADD_ICE_CREAM });
Store.dispatch({ type: ADD_ICE_CREAM });
Store.dispatch({ type: ADD_ICE_CREAM });
Store.dispatch({ type: ADD_ICE_CREAM });
Store.dispatch({ type: ADD_ICE_CREAM });
Store.dispatch({ type: REMOVE_ICE_CREAM });
Store.dispatch({ type: REMOVE_ICE_CREAM });
Store.dispatch({ type: REMOVE_ICE_CREAM });
