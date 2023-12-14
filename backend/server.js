const express = require("express");
const bodyParser = require("body-parser");
const createJwtToken = require("./lib/jwt");
const jwt = require("jsonwebtoken");

const cors = require("cors");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const productsRouter = require("./api/products");
const usersRouter = require("./api/users");
const ordersRouter = require("./api/orders");
const loginRouter = require("./api/login");

const UsersService = require("./services/UsersService");

require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // Разрешенный источник (можно использовать '*' для разрешения от всех)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Разрешенные методы запросов
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type, Authorization", // Разрешенные заголовки
};

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: "Something failed!" });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render("error", { error: err });
}

// TASK 12. Block unauthenticated users
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(403).json({ error: "Forbidden" });
      } else {
        req.userData = data;
        next();
      }
    });
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
};

app.use(cors(corsOptions));
app.use(passport.initialize());

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.use("/products", productsRouter);
app.use("/users", usersRouter);
// TASK 12. Block unauthenticated users
app.use("/orders", verifyToken, ordersRouter);
app.use("/login", loginRouter);

// TASK 2. Login with Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.META_APP_ID,
      clientSecret: process.env.META_APP_SECRET,
      callbackURL: process.env.META_REDIRECT_URI,
      profileFields: ["id", "email", "name"],
    },
    async function (_accessToken, _refreshToken, profile, done) {
      const user = await UsersService.getByFacebookOrCreate(
        profile.id,
        profile
      );
      done(null, createJwtToken(user));
    }
  )
);

app.get("/auth/meta", passport.authenticate("facebook"));

app.get(
  "/auth/meta/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/auth?jwt=${req.user}`);
  }
);

// TASK 2. Login with Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    async function (_accessToken, _refreshToken, profile, done) {
      const user = await UsersService.getByGoogleOrCreate(profile.id, profile);
      done(null, createJwtToken(user));
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  function (req, res) {
    res.redirect(`${process.env.FRONTEND_URL}/auth?jwt=${req.user}`);
  }
);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
