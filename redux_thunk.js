const { default: axios } = require("axios");
const redux = require("redux");
const newStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
//initialState

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQ = "FETCH_USERS_REQ";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";

const fetchUsersReq = () => {
  return {
    type: FETCH_USERS_REQ,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersError = (error) => {
  return {
    type: FETCH_USERS_ERROR,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQ:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  }
};

const fetchUsersFromApi = () => {
  return function (dispatch) {
    dispatch(fetchUsersReq());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        dispatch(fetchUsersSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchUsersError(err));
      });
  };
};

const store = newStore(reducer, applyMiddleware(thunkMiddleware));
const unsubscribe = store.subscribe(() => {
  console.log("Updated State: ", store.getState());
});
store.dispatch(fetchUsersFromApi());
// store.dispatch(fetchUsersFromApi());
// unsubscribe();
