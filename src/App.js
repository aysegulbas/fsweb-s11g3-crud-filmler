import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";

import MovieHeader from "./components/MovieHeader";

import FavoriteMovieList from "./components/FavoriteMovieList";

import axios from "axios";
import EditMovieForm from "./components/EditMovieForm";
import AddMovieForm from "./components/AddMovieForm";
import useAxios, { REQ_TYPES } from "./endpoints/useAxios";

const App = (props) => {
  const list = JSON.parse(localStorage.getItem("favliste"));
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState(list ? list : []);
  const { push } = useHistory();
  const [getMovies] = useAxios();
  const [deleteMovies] = useAxios();
  //doRequeste denk geliyor//

  useEffect(() => {
    getMovies({
      endpoint: "movies",
      reqType: REQ_TYPES.GET,
    }).then((res) => {
      setMovies(res);
    });

    // axios
    //   .get("http://localhost:9000/api/movies")
    //   .then((res) => {
    //     setMovies(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const deleteMovie = (id) => {
    deleteMovies({
      endpoint: `movies/${id}`,
      reqType: REQ_TYPES.DELETE,
    }).then((res) => {
      setMovies(res);
      push("/movies");
    });

    // axios
    //   .delete(`http://localhost:9000/api/movies/${id}`)
    //   .then((res) => {
    //     setMovies(res.data);
    //     push("/movies");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const addToFavorites = (id) => {
    favoriteMovies.find((f) => f.id === id)
      ? setFavoriteMovies([...favoriteMovies])
      : setFavoriteMovies([...favoriteMovies, movies.find((k) => k.id == id)]);
    // movie sayfasında movie.id şeklinde id'li çağırdığımız için üst satırda find((k) => k.id == id)] diye ekledik (movie olan fonks argumanını da id olarak değiştirdik), eğer hiç movie.id çağırmasaydık burda movie deyip bırakacaktık.//
  };
  useEffect(() => {
    localStorage.setItem("favliste", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);
  // useEffect(() => {
  //   const guncelFav = favoriteMovies.map((f) => {
  //     return movies.find((val) => val.id == f.id);
  //   });
  //   setFavoriteMovies(guncelFav);
  // }, [movies]);
  return (
    <div>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route exact path="/movies/edit/:id">
              <EditMovieForm setMovies={setMovies} />
            </Route>
            <Route path="/movies/add">
              <AddMovieForm setMovies={setMovies} />
            </Route>

            <Route path="/movies/:id">
              <Movie
                deleteMovie={deleteMovie}
                addToFavorites={addToFavorites}
              />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
