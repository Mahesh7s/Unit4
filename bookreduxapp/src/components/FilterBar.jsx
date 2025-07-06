import { useDispatch, useSelector } from "react-redux";
import {
  setAuthorFilter,
  setGenreFilter,
  setReadFilter,
} from "../redux/actions/filterActions";

export default function FilterBar() {
  const { author, genre, read } = useSelector((s) => s.filters);
  const dispatch = useDispatch();

  return (
    <section className="filter-bar">
      <input
        placeholder="Filter by author"
        value={author}
        onChange={(e) => dispatch(setAuthorFilter(e.target.value))}
      />
      <input
        placeholder="Filter by genre"
        value={genre}
        onChange={(e) => dispatch(setGenreFilter(e.target.value))}
      />
      <select
        value={read}
        onChange={(e) => dispatch(setReadFilter(e.target.value))}
      >
        <option value="all">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>
    </section>
  );
}
