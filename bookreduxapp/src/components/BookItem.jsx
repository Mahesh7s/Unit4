import { useDispatch } from "react-redux";
import { toggleRead, deleteBook } from "../redux/actions/bookActions";

export default function BookItem({ book, onEdit }) {
  const dispatch = useDispatch();

  return (
    <article className="book-card">
      <h4>{book.title}</h4>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Genre:</strong> {book.genre || "—"}
      </p>
      <p>
        <strong>Status:</strong> {book.read ? "Read ✅" : "Unread ⏳"}
      </p>

      <div className="book-actions">
        <button onClick={() => dispatch(toggleRead(book.id))}>
          Toggle Read
        </button>
        <button onClick={() => onEdit(book)}>Edit</button>
        <button onClick={() => dispatch(deleteBook(book.id))}>Delete</button>
      </div>
    </article>
  );
}
