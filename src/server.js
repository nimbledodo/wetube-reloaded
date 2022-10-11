import express from "express";

const PORT = 4000;
const app = express();

const handleHome = (req, res) => {
  return res.send("<h1>I love you</h1>");
};

const handleLogin = (req, res) => {
  return res.send("You are in login");
};

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.get("/", handleHome);
app.get("/login", handleLogin);
app.listen(PORT, handleListening);
