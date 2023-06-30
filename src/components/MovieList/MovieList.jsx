import React, { useEffect, useState } from "react";
import "./MovieList.css";
import { useParams } from "react-router-dom";
import Card from "../Card/Card";
import api_key from "../../constants/constant";

function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  //   useEffect(() => {
  //     getData();
  //   }, []);

  useEffect(() => {
    getData();
  }, [type]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=${api_key}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        
        setMovieList(data.results);
      });
  };

  return (
    <div className="movie_list">
      <h2 className="list_title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list_cards">
        {movieList.map((movie) => (
          <Card movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
