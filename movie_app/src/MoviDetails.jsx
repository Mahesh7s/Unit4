import React from "react"

import fetchMovie from "./movie"
import {useState,useEffect} from "react"
import { useParams } from "react-router-dom"

export default function MovieDetails() {
  const { movie } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const data = await fetchMovie(movie);
      if (data && data.Search) {
        setMovies(data.Search);
      }
      setLoading(false);
    }

    getData();
  }, [movie]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Results for "{movie}"</h2>
      {movies.length > 0 ? (
        movies.map((m) => (
          <div key={m.imdbID}>
            <h3>{m.Title}</h3>
            <img src={m.Poster} alt={m.Title} width="100" />
            <p>Year: {m.Year}</p>
          </div>
        ))
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
}