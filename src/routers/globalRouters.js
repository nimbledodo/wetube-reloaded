import express from "express";
import { join, login } from "../controllers/userController.js";
import { home, search } from "../controllers/videoController.js";

const globalRouter = express.Router();

const handleHome = (req, res) => res.send("Home");

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
