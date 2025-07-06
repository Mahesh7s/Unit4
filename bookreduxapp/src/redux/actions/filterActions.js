export const setAuthorFilter = (author) => ({
  type: "SET_AUTHOR_FILTER",
  payload: author,
});

export const setGenreFilter = (genre) => ({
  type: "SET_GENRE_FILTER",
  payload: genre,
});

export const setReadFilter = (read) => ({
  type: "SET_READ_FILTER",
  payload: read,
});
