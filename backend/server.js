const express = require("express");
const bodyParser = require("body-parser");
// const authRoutes = require('./src/AuthRoutes');

const cors = require("cors");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

const productsRouter = require("./api/products");

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

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

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
      const userData = {
        id: user.id,
        // email: profile.emails[0].value,
        name: user.name,
        role: user.role,
      };
      done(null, jwt.sign(userData, process.env.JWT_SECRET));
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    async function (_accessToken, _refreshToken, profile, done) {
      const user = await UsersService.getByGoogleOrCreate(profile.id, profile);
      const userData = {
        id: user.id,
        name: user.name,
        role: user.role,
      };
      done(null, jwt.sign(userData, process.env.JWT_SECRET));
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
