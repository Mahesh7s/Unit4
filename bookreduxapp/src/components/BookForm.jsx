import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBook, editBook } from "../redux/actions/bookActions";

export default function BookForm({ editTarget, onDone }) {
  const [form, setForm] = useState(
    editTarget ?? { title: "", author: "", genre: "", read: false }
  );
  const dispatch = useDispatch();

  /* sync when editing */
  useEffect(() => {
    if (editTarget) setForm(editTarget);
  }, [editTarget]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) {
      alert("Title & Author are required");
      return;
    }

    if (editTarget) {
      dispatch(editBook(editTarget.id, form));
    } else {
      dispatch(addBook({ ...form, id: crypto.randomUUID() }));
    }

    onDone?.();
    if (!editTarget) setForm({ title: "", author: "", genre: "", read: false });
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
      />
      <input
        name="genre"
        placeholder="Genre"
        value={form.genre}
        onChange={handleChange}
      />
      <label style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
        <input
          type="checkbox"
          name="read"
          checked={form.read}
          onChange={handleChange}
        />
        Read
      </label>

      <button type="submit">{editTarget ? "Save" : "Add Book"}</button>
      {editTarget && (
        <button type="button" onClick={onDone}>
          Cancel
        </button>
      )}
    </form>
  );
}
