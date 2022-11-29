//sudo mongod --dbpath ~/data/db : Mongo DB 시작위한 명령어

import express from "express";
import session from "express-session";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import { localsMiddleware } from "./middlewares";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // to make backend understands json.
// We need to explicitly set in the header the data type

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false, // resave와 saveUninitialized를 false로 하면 로그인 한 사용자에게만 쿠키를 준다.
    saveUninitialized: false,
    // cookie: {
    //   maxAge: 20000, // in msec
    // },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(flash()); //after session
app.use(localsMiddleware); //localsMiddleware는 session이 정의되고 난 후에 use해야 함
app.use("/assets", express.static("assets")); //앞의 것은 url, 뒤의 것은 folder 이름
app.use("/uploads", express.static("uploads")); //폴더 전체를 browser에서 접근할 수 있도록 해줌
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;
