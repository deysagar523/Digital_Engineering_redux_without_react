const redux = require("redux");
const newStore = redux.legacy_createStore;
const reduxLogger = require("redux-logger");
const applyMiddleware = redux.applyMiddleware;
const logger=reduxLogger.createLogger();
// console.log("redux demo")

//action
const ORDER_CAKE = "ORDER_CAKE";
const ADD_CAKE = "ADD_CAKE";
const ORDER_ICECREAM = "ORDER_ICECREAM";

const orderCake = () => {
  return {
    type: ORDER_CAKE,
    info: "to order cake",
  };
};

const addCake = () => {
  return {
    type: ADD_CAKE,
    info: "to add cake",
  };
};

const orderIcecream = () => {
  return {
    type: ORDER_ICECREAM,
    info: "to order icecream",
  };
};

//initial state
const iniCakeState = {
  totalNoOfCakes: 5,
  priceForCake: 250,
  totalAmount: 0,
};

const iniIcecreamState = {
  totalNoOfIcecreams: 20,
  priceForIcecream: 25,
  totalAmount: 0,
};

//reducer

const cakeReducer = (state = iniCakeState, action) => {
  switch (action.type) {
    case ORDER_CAKE:
      return {
        ...state,
        totalNoOfCakes: state.totalNoOfCakes - 1,
        totalAmount: state.totalAmount + state.priceForCake,
      };
    case ADD_CAKE:
      return {
        ...state,
        totalNoOfCakes: state.totalNoOfCakes + 1,
      };
    default:
      return state;
  }
};

const IcecreamReducer = (state = iniIcecreamState, action) => {
  switch (action.type) {
    case ORDER_ICECREAM:
      return {
        ...state,
        totalNoOfIcecreams: state.totalNoOfIcecreams - 1,
        totalAmount: state.totalAmount + state.priceForIcecream,
      };
    // case ADD_CAKE:
    //   return {
    //     ...iniCakeState,
    //     totalNoOfCakes: state.totalNoOfCakes + 1,
    //   };
    default:
      return state;
  }
};

const combinedReducers = redux.combineReducers({
  cake: cakeReducer,
  icecream: IcecreamReducer,
});
const store = newStore(combinedReducers,applyMiddleware(logger));
console.log("Initial state : ", store.getState());
const unsubscribe = store.subscribe(() =>
  {}
);
store.dispatch(orderCake());
store.dispatch(orderCake());
// store.dispatch(orderIcecream());
// store.dispatch(orderIcecream());
store.dispatch(addCake());
unsubscribe();
