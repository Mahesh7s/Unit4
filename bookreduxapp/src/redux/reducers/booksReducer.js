const initialState = [];

export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, action.payload];

    case "TOGGLE_READ":
      return state.map((book) =>
        book.id === action.payload ? { ...book, read: !book.read } : book
      );

    case "EDIT_BOOK":
      return state.map((book) =>
        book.id === action.payload.id ? { ...book, ...action.payload.data } : book
      );

    case "DELETE_BOOK":
      return state.filter((book) => book.id !== action.payload);

    default:
      return state;
  }
}
