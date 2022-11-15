const database = require("./database.js");

const getMovies = (req, res) => {
  database
    .query("SELECT * FROM movies")
    .then(([movies])=> {
      res.json(movies);
    })
    .catch((err)=> {
        console.log(err);
        res.status(500).send("Error retrieving movies from database");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database 
    .query(`SELECT * FROM movies WHERE id = ?`, [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      res.status(500).send("Error retrieving movies from database")
    });
};

const postMovie = (req, res) => {
  const {title, director, year, color, duration} = req.body;

  database
    .query("INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)", [title, director, year, color, duration])
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    })
  };

module.exports = {
  getMovies,
  getMovieById,
  postMovie,
};
