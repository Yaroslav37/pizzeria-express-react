// server.js

const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(session({ secret: '571a8c2e9805d5dac267f1f1bff25bd4', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3001/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // Можно выполнить дополнительные действия после успешной аутентификации
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Успешная аутентификация, перенаправление или обработка
    res.redirect('/');
  }
);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
