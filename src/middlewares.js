import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const isHeroku = process.env.NODE_ENV === "production";
console.log("NODE_ENV: ", process.env.NODE_ENV);
// console.log("isHeroku: ", isHeroku);

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "wetube-jeehyang/images",
  acl: "public-read",
});

const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "wetube-jeehyang/videos",
  acl: "public-read",
});

export const localsMiddleware = (req, res, next) => {
  // pug에서는 local에 있는 정보만 읽을 수 있기 때문에 middleware를 만들어줌
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {}; //{}는 loggedIn user가 없을 때 사용하기 위함
  res.locals.isHeroku = isHeroku;
  next();
};

export const protectorMiddleware = (req, res, next) => {
  console.log(req.session.loggedIn);
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Not authorized (Logged in only)");
    return res.redirect("/login");
  }
}; //login한 사람만 갈 수 있는 페이지 설정

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Not authorizedBy (Logged out only)");
    return res.redirect("/");
  }
}; //login하지 않은 사람만 갈 수 있는 페이지

export const avartarUpload = multer({
  dest: !isHeroku ? "uploads/avatars/" : undefined,
  limits: { fileSize: 3000000 },
  storage: isHeroku ? s3ImageUploader : undefined,
});
export const videoUpload = multer({
  dest: !isHeroku ? "uploads/videos/" : undefined,
  limits: {
    fileSize: 10000000,
  },
  storage: isHeroku ? s3VideoUploader : undefined,
});
