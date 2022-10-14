import express from "express";
import { join, login } from "../controllers/userController.js";
import { trending } from "../controllers/videoController.js";

const globalRouter = express.Router();

const handleHome = (req, res) => res.send("Home");

globalRouter.get("/", trending);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
