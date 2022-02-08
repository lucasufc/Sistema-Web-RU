const express = require('express');
const path = require('path');
const session = require('express-session');
const ind = require('./scripts/api/index');
const port = 5000;
const bodyParser = require('body-parser');
const app = express();
// Database
const { Pool, Connection } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "webru",
    password: "123",
    port: 5432
  });
  console.log("Successful connection to the database");

  const sql_create = `
  DROP TABLE IF EXISTS public.users;
  CREATE SEQUENCE users_id
      start 1 
      increment 1;
  
  CREATE TABLE IF NOT EXISTS public.users
  (
      id integer NOT NULL DEFAULT nextval('users_id'),
      name character varying(100) NOT NULL,
      imageSrc character varying(100) NOT NULL,
      email character varying(100) NOT NULL,
      registrationNumber character varying(8) NOT NULL,
      favoriteDish character varying(100) NOT NULL,
      time character varying(10) NOT NULL,
      enableNotifications character varying(4) NOT NULL,
      password character varying(100) NOT NULL,
      rule character varying(5) COLLATE pg_catalog."default",
      CONSTRAINT users_pkey PRIMARY KEY (id)
  );`
  pool.query(sql_create, [], (err, result) => {
    if (err) {
        return console.error(err.message);
    }
        console.log("Successful creation of the 'Public.users' table");
    });

// MULTER
const multer = require('multer');
// Configuração de armazenamento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/img')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = require('crypto')
            .randomBytes(32)
            .toString('hex');

        // Indica o novo nome do arquivo:
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const upload = multer({ storage });

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

app.use('/', ind);

app.get('/', function(req, res) {
    res.redirect("/")
})
//app.get('/sobre', index);
app.listen(port, () => console.log("Servidor funcional em: http://localhost:" + port));