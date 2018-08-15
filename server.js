const dotenv = require('dotenv');
      dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
};

//TODO get user from db
//PUTS user in req.user
const strategy = new JwtStrategy(opts, (payload, next) => {
    const user = null;
    next(null, user);
});
passport.use(strategy);
app.use(passport.initialize());

app.set('port', 5000);
app.use('/', routes);

app.listen(app.get('port'), () => {
    console.log(`server running on port ${app.get('port')} `);
});