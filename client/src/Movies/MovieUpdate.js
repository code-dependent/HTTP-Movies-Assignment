import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const MovieUpdate = (props) => {
  const { id } = useParams();
  const { push } = useHistory();
  const [stars, setStars] = useState([]);
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setStars(res.data.stars.map((star, i) => `star${i}`));
      })
      .catch((err) => console.log(err.response));
  }, []);

  console.log(movie);

  const changeHandle = (e) => {
    setMovie({
      ...movie,
      stars: [...movie.stars, e.target.value],
    });
  };
  const starChangeHandle = (e, i) => {
    setMovie({
      ...movie,
      stars: { [e.target.name]: e.target.value },
    });
  };
  const addStar = (e) => {
    e.preventDefault();
    setStars([...stars, `star${stars.length}`]);
    console.log(stars);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    const stars = Object.keys(movie.stars)
      .map((star) => `${movie.stars[star]}, `)
      .join("");
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log(res);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  console.log(stars);

  return (
    <>
      <form onSubmit={submitHandle}>
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={changeHandle}
        />
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={changeHandle}
        />
        <input
          type="text"
          name="metascore"
          value={movie.metascore}
          onChange={changeHandle}
        />
        {stars.map((star, i) => (
          <input
            key={star}
            type="text"
            name={`star${stars.length}`}
            value={movie.stars[i]}
            onChange={starChangeHandle}
          />
        ))}
        <button>Submit</button>
      </form>
      <button onClick={addStar}>Add a Star</button>
    </>
  );
};

export default MovieUpdate;
