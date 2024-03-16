const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(bodyParser.json());

let users = [
  { id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", username: "john_doe", password: "jd1234" },
  { id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", username: "alex_walker", password: "aw1234" },
  { id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", username: "iowa_ford", password: "iw1234" },
];

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const selectedUser = users.find((user) => user.id === req.params.id);
  if (!selectedUser) return res.status(404).send("User not found");
  res.json(selectedUser);
});

app.post("/api/users", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Invalid username or password");
  }

  // checking if the user already exists
  const userAlreadyExists = users.some((user) => user.username === username);

  if (userAlreadyExists) {
    return res.status(400).send("User already exists");
  }

  // generating a new id for the user
  const newId = uuidv4();

  const newUser = {
    id: newId,
    username: username,
    password: password,
  };

  users.push(newUser);
  res.json(newUser);
});

app.put("/api/users/:id", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and Password are required");
  }

  const selectedUser = users.find((user) => user.id === req.params.id);
  if (!selectedUser) return res.status(404).send("User not found");

  // updating the user information
  selectedUser.username = username;
  selectedUser.password = password;

  res.json(selectedUser);
});

app.delete("/api/users/:id", (req, res) => {
  const selectedUser = users.find((user) => user.id === req.params.id);
  if (!selectedUser) return res.status(404).send("User not found");

  users = users.filter((user) => user.id !== req.params.id);
  res.json(selectedUser);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port 3000 ${PORT}`);
});
