import BookForm from "./components/BookForm";
import FilterBar from "./components/FilterBar";
import BookList from "./components/BookList";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <h2>📖 My Book Library</h2>
      <BookForm />
      <FilterBar />
      <BookList />
    </div>
  );
}
