let config = require('./config/db_config.js');
let API = require('./model/user.js');
let express = require('express');
let app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

/*
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(config.mysql);


app.use(session({
    key: 'cookie',
    secret: 'SECRET',
    store: sessionStore,
    resave: true,
    cookie: { domain: process.env.domain},
    saveUninitialized: true
}));
*/

app.use('/', express.static(__dirname + '/static'));
app.use( bodyParser.json({limit: '50mb'}) );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  limit: '50mb',
  extended: true
})); 
app.set('view engine','ejs');


app.get('/', (req,res)=>{
	
	res.json({
		success: "true",
	});
})

app.post('/api/register', (req,res)=>{
  let {user_name, password, email} = req.body;
  
  API.register_user(user_name, password, email)
  .then( (result)=>{
    res.send(result);
  });
  
})

app.post('/api/login', (req,res)=>{
  let {user_name, password} = req.body;
  
  API.login(user_name, password)
  .then( (result)=>{
    res.send(result);
  });
  
})


app.listen(8080, () => {
    console.log(`Running on port 8080`);
});