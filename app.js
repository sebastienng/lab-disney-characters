/**
 *  Your code ⬇️
 */

const disney = require("./disney.json");

const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/characters", (req, res) => {
  // console.log(req.route);
  const { name, film } = req.query;
  let result = [...disney];

  if (film) {
    /**
     * A character can be in multiple movies, we will want to filter the characters
     * based on the fact that the film variable (the film name) is included in atleast some
     * of the films of a character.
     */

    result = result.filter((char) =>
      char.films.some((element) =>
        element.toLocaleLowerCase().includes(film.toLocaleLowerCase())
      )
    );
    console.log(result);
  }
  if (name) {
    result = result.filter((char) =>
      char.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );
  }

  res.json(result);
});

app.get("/characters/:_id", (req, res) => {
  if (req.params) {
    const { _id } = req.params;
    const myChar = disney.find((char) => char._id === Number(_id));
    res.json(myChar);
  }
});
app.use(express.json());
app.post("/", function (req, res) {
  const { name, films } = req.query;
  const _id = disney.at(-1)._id + 1;
  const characterToCreate = { name, films, _id };

  disney.push(characterToCreate);

  res.send({ message: `${name} added`, characterToCreate });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
