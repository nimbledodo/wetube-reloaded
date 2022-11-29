import "regenerator-runtime";
import "dotenv/config"; //이렇게하면 하나만 적어도 된다. 단, .env 파일을 src 밖에 넣어야 한다는 점을 기억할 것!
// require("dotenv").config();
//require("dotenv").dconfig()
//dotenv 사용하기 위한 명령어. use it as early as possible
//하지만 이렇게 쓰면 사용하는 모든 js 파일에 써줘야한다.
import "./db"; // importing db.js file
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
