const express = require('express');
const path = require('path');
const session = require('express-session');
const api = require('./api');
const port = 3000;
const bodyParser = require('body-parser');
const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// Server configuration
app.use(express.urlencoded({ extended: false })); // <--- middleware configuration


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/assets'));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.set('views', path.join(__dirname, '/'));

//ROTAS

app.use('/', api);

app.get('/', function(req, res) {
    res.redirect("/")
})
//app.get('/sobre', index);
app.listen(port, () => console.log("Servidor funcional em: http://localhost:" + port));