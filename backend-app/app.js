var express = require('express');
var app = express();
const mongoose = require('./mongodb/mongoose');
const userData = require('./mongodb/models/userDetails');
const userSessionData = require('./mongodb/models/userSessionDetails');
const winston = require('winston');
const { combine, timestamp } = winston.format;

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS, HEAD, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    winston.format.printf(info => {
      return `${info.timestamp} [${info.service}] ${info.level}: ${info.message} : ${info[Symbol.for('splat')] ? JSON.stringify(info[Symbol.for('splat')][0]) : ''}`;
    })
  ),
  defaultMeta: { service: 'account-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error', 'timestamp':true }),
    new winston.transports.File({ filename: 'combined.log', 'timestamp':true }),
  ],
});

//print logs to console
logger.add(new winston.transports.Console({
  format: winston.format.simple(),
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/createAccount', (req, res) => {
    console.log("==================== createAccount =========================");
    console.log("create account ==> " ,req.body.userDetails);
    userData.find({username: req.body.userDetails.username}).then((user) => {
        console.log("user exists ==> " ,user);
        if(user.length > 0){
            console.log("user already exist");
            logger.error('Account Creation - User already exist', req.body.userDetails);
            res.status(409).send({msg: 'User already exist'});
        }
        else{ 
          let payload = req.body.userDetails;
          userData.create(payload).then((user) => {
            console.log("inserted user ==> " ,user);
            logger.info('Account Creation - User created successfully', payload);
            res.status(200).send({status: 200, msg: 'Account created successfully'});
          }).catch((err) => {
            console.log(err);
            logger.error('Account Creation - Insertion to table failed', payload);
            res.status(400).send({status: 400, msg: 'Account creation failed'});
          });
        }
    }).catch((err) => {
        console.log(err);
    });  
});

app.post('/login', (req, res) => {
  console.log("==================== login =========================");
    console.log("login ==> ", req.body);
    userData.find({username: req.body.username, password: req.body.password}).then((user) => {
        console.log("user exists ==> " ,user);
        if(user.length > 0){
            console.log("user exists");
            logger.info('User login - Successfully logged in', req.body);
            res.status(200).send({status: 200, msg: 'Login success'});
        }
        else{ 
            logger.error('User login - User does not exist', req.body);
            console.log("user does not exist");
            res.status(404).send({status: 404, msg: 'User does not exist'});
        }
    }).catch((err) => {
        logger.error('User login - Error in finding user', req.body);
        console.log(err);
    });
});

app.post('/logout', (req, res) => {
  console.log("==================== logout =========================");
  console.log("logout ==> ", req.body);
  userData.find({username: req.body.username}).then((user) => {
    console.log("user exists ==> " ,user);   
    let payload = {
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      username: req.body.username,
      loginDate: req.body.loginDate,
      sessionTimeInSec: req.body.sessionTimeInSec,
      loginCountry: req.body.loginCountry,
      loginBrowser: req.body.loginBrowser
    };
    console.log("payload log data ==> " , payload);
    userSessionData.create(payload).then((session) => {
      console.log("inserted session ==> " , session);
      logger.info('User Logout - User session data saved successfully', payload);
    }).catch((err) => {
      console.log(err);
    });
    res.status(200).send({status: 200, msg: 'Logout success'});
  });
});

app.listen(3000, function () {
  console.log('Backend app listening on port 3000!');
});