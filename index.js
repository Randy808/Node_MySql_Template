let config = require('./config/db_config.js');
let express = require('express');
let app = express();
var cors = require('cors');
var bodyParser = require('body-parser');


var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(config.mysqlConfig);

let UserAPI = require('./model/user/index.js');
let PostAPI = require('./model/post/index.js');
let CommentAPI = require('./model/comment/index.js');

global.appRoot = __dirname;


app.use(session({
    key: 'cookie',
    secret: 'SECRET',
    store: sessionStore,
    resave: true,
    cookie: { domain: process.env.domain},
    saveUninitialized: true
}));

app.use(cors({credentials: true, origin: [`http://lvh.me:8080`,`http://lvh.me:8181`]}));
let staticResourceRegex = /(js|json|ico|gif|jpg|png|css|html|swf|mp3|wav|txt|woff)$/;
app.use('/', express.static(__dirname + '/static'));
app.use('/js/', express.static(__dirname + '/views/js'));
app.use( bodyParser.json({limit: '50mb'}) );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  limit: '50mb',
  extended: true
})); 
app.set('view engine','ejs');


app.get('/', (req,res)=>{
	
	res.json({
		success: "true",
    user_id: JSON.stringify(req.session)
	});
})

app.post('/api/register', (req,res)=>{
  let {user_name, password, email} = req.body;
  
  UserAPI.register(user_name, password, email)
  .then( (result)=>{
    res.send(result);
  });
  
})

app.post('/api/login', (req,res)=>{
  let {user_name, password} = req.body;
  console.log(JSON.stringify(req.body));
  
  UserAPI.login(req, user_name, password)
  .then( (result)=>{
    res.send(result);
  });
  
})

app.post('/api/post', (req,res)=>{
  let {post_text} = req.body;
  
  PostAPI.createPost(req.session.user_id, post_text)
  .then( (result)=>{
    res.send(result);
  });
  
})

app.get('/api/post', (req,res)=>{
  
  PostAPI.getPosts()
  .then( (result)=>{
    res.send(result);
  });
  
})

app.delete('/api/post', (req,res)=>{
  let {post_id} = req.body;
  
  PostAPI.removePost(post_id)
  .then( (result)=>{
    res.send(result);
  });
  
})




app.post('/api/comment', (req,res)=>{
  let {post_id, comment_text} = req.body;
  
  CommentAPI.createComment(req.session.user_id, post_id, comment_text)
  .then( (result)=>{
    res.send(result);
  });
  
})

app.get('/api/comment', (req,res)=>{
  console.log(req.query);
  CommentAPI.getPostComments(req.query.post_id)
  .then( (result)=>{
    res.send(result);
  });
  
})

app.delete('/api/comment', (req,res)=>{
  let {comment_id} = req.body;
  
  CommentAPI.removeComment(comment_id)
  .then( (result)=>{
    res.send(result);
  });
  
})

app.get('/:file', (req, res) => {
  console.log(__dirname + "/views/desktop/");
  let ext = appRoot + "/views/";
  let code;

  res.sendFile(ext + req.params.file + ".html");
});


app.listen(8080, () => {
    console.log(`Running on port 8080`);
});