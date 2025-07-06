export const addBook = (book) => ({
  type: "ADD_BOOK",
  payload: book,
});

export const toggleRead = (id) => ({
  type: "TOGGLE_READ",
  payload: id,
});

export const editBook = (id, data) => ({
  type: "EDIT_BOOK",
  payload: { id, data },
});

export const deleteBook = (id) => ({
  type: "DELETE_BOOK",
  payload: id,
});
