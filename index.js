let config = require('./config/db_config.js');
let API = require('./model/db.js');
let express = require('express');
let app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(config.mysql);


app.use(session({
    key: 'cookie',
    secret: 'ENMANAER',
    store: sessionStore,
    resave: true,
    cookie: { domain: process.env.domain},
    saveUninitialized: true
}));

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


app.listen(8080, () => {
    console.log(`Running on port 8080`);
});