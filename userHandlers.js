const database = require("./database.js");

const getUsers = (req, res) => {
  database
    .query("SELECT * FROM users")
    .then(([users]) => {
      res.json(users);
      res.status(200)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving users from database");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  
  database
    .query(`SELECT * FROM users WHERE id = ?`, [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.json(users[0])
        res.status(200)
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      res.status(500).send("Error retrieving users from database");
    })
}

module.exports = {
  getUsers,
  getUserById,
};
