const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  const repository = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(repository)

  return response.status(201).json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body
  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (repoIndex < 0) {
    return response.status(400).json({ error: `No repository for id "${id}"` })
  }

  likes = repositories[repoIndex].likes
  repositories[repoIndex] = { id, title, url, likes, techs }

  return response.status(200).json(repositories[repoIndex])

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (repoIndex < 0) {
    return response.status(400).json({ error: `No repository for id "${id}"` })
  }

  repositories.splice(repoIndex, 1)
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  const repoIndex = repositories.findIndex(repo => repo.id === id)

  if (repoIndex < 0) {
    return response.status(400).json({ error: `No repository for id "${id}"` })
  }
  repositories[repoIndex].likes++
  return response.status(201).send(repositories[repoIndex])
});

module.exports = app;
