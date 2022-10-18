import express from "express";
import {
  startGithubLogin,
  finishGithubLogin,
  edit,
  remove,
  see,
  logout,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/logout", logout);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/callback", finishGithubLogin);
userRouter.get("/:id", see);

export default userRouter;
