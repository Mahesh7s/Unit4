import { useState } from "react";
import { useSelector } from "react-redux";
import BookItem from "./BookItem";
import BookForm from "./BookForm";

export default function BookList() {
  const books = useSelector((s) => s.books);
  const filters = useSelector((s) => s.filters);
  const [editTarget, setEditTarget] = useState(null);

  const filtered = books.filter((b) => {
    const authorMatch = filters.author
      ? b.author.toLowerCase().includes(filters.author.toLowerCase())
      : true;
    const genreMatch = filters.genre
      ? b.genre.toLowerCase().includes(filters.genre.toLowerCase())
      : true;
    const readMatch =
      filters.read === "all"
        ? true
        : filters.read === "read"
        ? b.read
        : !b.read;
    return authorMatch && genreMatch && readMatch;
  });

  return (
    <>
      <h3>📚 Book List ({filtered.length})</h3>
      {filtered.length === 0 && <p>No books match your filter.</p>}

      <div className="grid">
        {filtered.map((b) => (
          <BookItem key={b.id} book={b} onEdit={setEditTarget} />
        ))}
      </div>

      {editTarget && (
        <div className="modal">
          <BookForm editTarget={editTarget} onDone={() => setEditTarget(null)} />
        </div>
      )}
    </>
  );
}
