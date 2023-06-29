import React, { useEffect, useState } from "react";
import "./HomePage.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import api_key from "../../constants/constant";

function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  console.log("apiKey  " + api_key);
  useEffect(() => {
    fetch(
      ` https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setPopularMovies(data.results);
      });
  }, []);
  return (
    <div className="poster">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        transitionTime={3}
        infiniteLoop={true}
        showStatus={false}
      >
        {popularMovies.map((movie, id) => (
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/movie/${movie.id}`}
          >
            <div className="posterImage">
              <img
                src={`https://image.tmdb.org/t/p/original${
                  movie && movie.backdrop_path
                }`}
                alt=""
              />
            </div>
            <div className="posterImage_overlay">
              <div className="posterImage_title">
                {movie ? movie.original_title : ""}
              </div>
              <div className="posterImage_runtime">
                {movie ? movie.release_date : ""}
                <span className="posterImage_rating">
                  {movie ? movie.vote_average : ""}
                  <i className="fas fa-star" />{" "}
                </span>
              </div>
              <div className="posterImage_description">
                {movie ? movie.overview : ""}
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
      <MovieList />
    </div>
  );
}

export default HomePage;
