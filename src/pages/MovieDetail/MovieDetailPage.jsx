import React, { useEffect, useState } from "react";
import "./MovieDetailPage.css";
import { useParams } from "react-router-dom";
import api_key from "../../constants/constant";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);
  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieDetails(data);
      });
  };
  return (
    <div className="movie">
      <div className="movie_intro">
        <img
          className="movie_backdrop"
          alt=""
          src={`https://image.tmdb.org/t/p/original${
            movieDetails ? movieDetails.backdrop_path : ""
          }`}
        />
      </div>
      <div className="movie_detail">
        <div className="movie_detailLeft">
          <div className="movie_posterBox">
            <img
              className="movie_poster"
              alt=""
              src={`https://image.tmdb.org/t/p/original${
                movieDetails ? movieDetails.poster_path : ""
              }`}
            />
          </div>
        </div>
        <div className="movie_detailRight">
          <div className="movie_detailRightTop">
            <div className="movie_name">
              {movieDetails ? movieDetails.original_title : ""}
            </div>
            <div className="movie_tagline">
              {movieDetails ? movieDetails.tagline : ""}
            </div>
            <div className="movie_rating">
              {movieDetails ? movieDetails.vote_average : ""}{" "}
              <i class="fas fa-star" />
              <span className="movie_voteCount">
                {movieDetails ? "(" + movieDetails.vote_count + ") votes" : ""}
              </span>
            </div>
            <div className="movie_runtime">
              {movieDetails ? movieDetails.runtime + " mins" : ""}
            </div>
            <div className="movie_releaseDate">
              {movieDetails ? "Release date: " + movieDetails.release_date : ""}
            </div>
            <div className="movie_genres">
              {movieDetails && movieDetails.genres
                ? movieDetails.genres.map((genre) => (
                    <>
                      <span className="movie_genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie_detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{movieDetails ? movieDetails.overview : ""}</div>
          </div>
        </div>
      </div>
      <div className="movie_links">
        <div className="movie_heading">Useful Links</div>
        {movieDetails && movieDetails.homepage && (
          <a
            href={movieDetails.homepage}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie_homeButton movie_Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {movieDetails && movieDetails.imdb_id && (
          <a
            href={"https://www.imdb.com/title/" + movieDetails.imdb_id}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <p>
              <span className="movie_imdbButton movie_Button">
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>
      <div className="movie_heading">Production companies</div>
      <div className="movie_production">
        {movieDetails &&
          movieDetails.production_companies &&
          movieDetails.production_companies.map((company) => (
            <>
              {company.logo_path && (
                <span className="productionCompanyImage">
                  <img
                    className="movie_productionCompany"
                    alt=""
                    src={
                      "https://image.tmdb.org/t/p/original" + company.logo_path
                    }
                  />
                  <span>{company.name}</span>
                </span>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
