import createDataContext from "./createDataContext";

const bookReducer = (state, action) => {
  switch (action.type) {
    case "SET_NY_TIMES_LISTS":
      return {
        ...state,
        nyTimesLists: action.payload
      };
    case "SET_NY_TIMES_BOOK":
      return {
        ...state,
        booksByList: action.payload
      };
    case "SET_BOOK_LIST":
      return {
        ...state,
        listName: action.payload
      };
    default:
      return state;
  }
};

function setNyTimesBookLists(dispatch) {
  return list => {
    dispatch({
      type: "SET_NY_TIMES_LISTS",
      payload: list
    });
  };
}

function setNyTimesBooks(dispatch) {
  return list => {
    dispatch({
      type: "SET_NY_TIMES_BOOK",
      payload: list
    });
  };
}

function setBookListName(dispatch) {
  return name => {
    dispatch({
      type: "SET_BOOK_LIST",
      payload: name
    });
  };
}

const initialBookState = {
  nyTimesLists: [],
  booksByList: [],
  listName: ""
};

export const { Context, Provider } = createDataContext(
  bookReducer,
  {
    setBookListName,
    setNyTimesBookLists,
    setNyTimesBooks
  },
  initialBookState
);
