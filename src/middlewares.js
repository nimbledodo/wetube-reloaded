export const localsMiddleware = (req, res, next) => {
  // pug에서는 local에 있는 정보만 읽을 수 있기 때문에 middleware를 만들어줌
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {}; //{}는 loggedIn user가 없을 때 사용하기 위함
  next();
};
