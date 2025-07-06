const initialState = {
  author: "",
  genre: "",
  read: "all", // all | read | unread
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_AUTHOR_FILTER":
      return { ...state, author: action.payload };

    case "SET_GENRE_FILTER":
      return { ...state, genre: action.payload };

    case "SET_READ_FILTER":
      return { ...state, read: action.payload };

    default:
      return state;
  }
}
