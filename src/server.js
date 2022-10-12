import express from "express";

const PORT = 4000;
const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>Not Allowed</h1>");
  }

  console.log("Allowed, you may continue");
  next();
};

const handleHome = (req, res) => {
  return res.send("I love middlewares");
};
// const handleLogin = (req, res) => {
//   return res.send("You are in login");
// };

// const handleProtected = (req, res) => {
//   return res.send("Welcmome to the private lounge.");
// };
const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.use(logger);
app.use(privateMiddleware);
app.get("/", handleHome);
// app.get("/protected", handleProtected);
app.listen(PORT, handleListening);
