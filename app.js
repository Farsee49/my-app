const pool = require('./api/db/pool');
require('dotenv').config()
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const SESSION_SECRET = process.env.SESSION_SECRET;
const path = require('path');
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const chalk = require('chalk');
const cors = require('cors');
const morgan = require('morgan');
const PORTAL = process.env.EXPPORT;
require('./utils/passport-config');
const router = require('./api/index.js')
const sessionStore = new pgSession({
    pool: pool, // Connection pool
    tableName: 'session',
    //createTableIfMissing: true,
    ttl: 24 * 60 * 60, // Session TTL in seconds (24 hours)
});

const sessionMiddleware = session({
  store: sessionStore,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,      // prevents JavaScript access
    secure: false,       // set to true in production with HTTPS
    sameSite: 'lax',     // helps prevent CSRF
    maxAge: 1000 * 60 * 60 // 1 hour
  }
});

const corsOptions = {
  origin: ['http://localhost:3000', "https://fcc-weather-api.glitch.me/api/current?"], // Adjust this to your frontend URL
  credentials: true, // Enable cookies
  methods: ['GET', 'POST', 'PUT','FETCH', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  preflightContinue: false, // Pass the CORS preflight response to the next handler
  optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs
  //) choke on 204, so we use 200 instead
  


};
app.use(cors(corsOptions));
app.use(session({
  store: sessionStore,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,      // prevents JavaScript access
    secure: false,       // set to true in production with HTTPS
    sameSite: 'lax',     // helps prevent CSRF
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(passport.initialize());
app.use(passport.session());




app.use('/api', router);


app.listen(PORTAL, () => {
    console.log(
        chalk.rgb(255, 136, 0).bold("SERVER ENGAGED AT PORT:"),
        chalk.bgGreenBright(PORTAL),
        chalk.blueBright("SPACE PORTAL OPEN!!!")
    )
  });
  try {
    pool.connect();
    console.log(chalk.cyanBright("DATABASE ENGAGED!"));
    } catch (error) {
    console.error(chalk.redBright("DATABASE START FAILURE!!!!!!!!!!"));
    }