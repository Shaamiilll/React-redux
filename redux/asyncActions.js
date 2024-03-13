const redux = require("redux");
const CreateStore = redux.createStore;
const applyMiddleware = require("redux").applyMiddleware;
const thunkMiddleware = require("redux-thunk")
const axios = require("axios");
const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USER_REQUESTED,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USER_FAILED,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USER_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const fetchUsers = () => {
    return function (dispatch) {
      dispatch(fetchUsersRequest());
      axios
        .get("https://jsonplaceholder.typicode.com/users") // Fixed typo here
        .then((response) => { // Changed variable name to response
          const users = response.data; // No need to map IDs, you want the whole user objects
          dispatch(fetchUsersSuccess(users));
        })
        .catch((error) => {
          dispatch(fetchUsersFailure(error.message));
        });
    };
  };
  
  const store = CreateStore(reducer, applyMiddleware(thunkMiddleware.default));


store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers())
