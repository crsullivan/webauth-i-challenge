const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require ('express-session'); // 1 npm i express-session
const KnexSessionStorage = require('connect-session-knex')(session); // for storing sessions in DB

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const knexConnection = require('../database/dbConfig.js');
const server = express();
// 2 configure sessions and cookies
const sessionConfiguration = {
  // default name is 'sid', should be changed
  name: 'bearCat',
  secret: process.env.COOKIE_SECRET || 'this needs to be super secret',
  cookie: {
    maxAge: 1000 * 60 * 60, // valid for 1 hour (in milliseconds)
    secure: process.env.NODE_ENV === "development" ? false : true, // do we send cookie over unsecured http? or only https?
    httpOnly: true // prevent client JS code from accessing the cookie?
  },
  resave: false, // save sessions even when they have not changed
  saveUninitialized: true,// read about it in the docs to respect GDPR
  store: new KnexSessionStorage({
    knex: knexConnection,
    clearInterval: 1000 * 60 * 10, // delete expired sessions every 10 mins
    tablename: 'user_sessions',
    sidfieldname: 'id',
    createtable: true
  })
  
};

server.use(helmet());
server.use(express.json());
server.use(cors()); // research credentials: true and withCredentials (when connecting from your react app)
server.use(session(sessionConfiguration));// 3 use the session middleware globally

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up', session: req.session });
});

module.exports = server;
