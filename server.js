const express = require('express');
const { Pool, Connection } = require("pg");
const crypto = require('crypto')
const alg = 'aes-256-ctr'
const pwd = 'abcdabcd'
const path = require('path');
const session = require('express-session');

const multer = require('multer');

//para gerar e verificar tokens
const jwt = require('jsonwebtoken');
const SECRET = "sistema_WEB_RU"


const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const { Console } = require('console');
const { doesNotMatch } = require('assert');

const app = express();


const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "webru",
    password: "123",
    port: 5432
  });
  console.log("Successful connection to the database");

  const sql_create = `DROP TABLE IF EXISTS public.users;
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
//app.use(express.static('/assets'));
//app.use(express.static("/assets/img"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('views', path.join(__dirname, '/'));

function selectUser(profile) {
    var users = [
        {
            name: "Glauton Santos",
            imageSrc: "/img/perfil-glauton-santos.jpg",
            email: "glautoncardoso@gmail.com",
            registrationNumber: "404201",
            favoriteDish: "Frango frito",
            time: "13:00",
            enableNotifications: "Sim",
            password: "a531605115996ca7c8",
            rule: "admin"
        },
        {
            name: "Lucas Martins",
            imageSrc: "/img/perfil-lucas-martins.jpeg",
            email: "lucasmartins@gmail.com",
            registrationNumber: "404206",
            favoriteDish: "Fígado",
            time: "11:00",
            enableNotifications: "Não",
            password: "a531605115996ca7c9",
            rule: "user"
        },
        {
            name: "Victor Santos",
            imageSrc: "/img/perfil-victor-santos.jpeg",
            email: "victorsantos@gmail.com",
            registrationNumber: "404205",
            favoriteDish: "Estrogonofe de carne",
            time: "12:30",
            enableNotifications: "Sim",
            password: "a531605115996ca7ca",
            rule: "admin"
        },
        {
            name: "Anderson Leandro",
            imageSrc: "/img/perfil-anderson-leandro.jpeg",
            email: "andersonleandro@gmail.com",
            registrationNumber: "404203",
            favoriteDish: "Feijoada",
            time: "12:00",
            enableNotifications: "Não",
            password: "a531605115996ca7cb",
            rule: "user"
        }
    ]

    var selectedUser = null;

    users.forEach(user => {
        if(user["registrationNumber"] == profile) {
            selectedUser = user;
        }
    })
    return selectedUser;
}

function checkPassword(incomePassword, expectedPassword) {
    if(incomePassword == expectedPassword) return true;
}

app.get('/', (req, res) => {
    res.render('views/index');
});

//função de MIDDLEWARE
function verifyJWT(req,res, next){
    const token = req.headers['x-access-token'];
    const index = blacklist.findIndex(item => item === token)
    if(index !== -1) return res.status(401).end();

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).end();

        req.userId = decoded.userId;
        next();
    })
}

app.get('/logout', (req, res) => {
    res.cookie('token', null);
    res.redirect('/login');
});

const blacklist = [];
app.post('/logout', (req,res) => {
    blacklist.push(req.headers['x-access-token']);
    res.end();
});

/*app.get('/usuario', (req, res) => {
    const user = selectUser(req.cookies.token);
    if (user["rule"] == "user") {
        res.render('views/userProfile', { user: user });
    } else {
        res.send("Sem autorização");
    }
});*/

app.get("/usuario/:id", (request, response) => {
    if (request.session.loggedin) {
		// Output username
		//response.send('Welcome back, ' + request.session.registrationnumber + '!');
        //const id = req.session.registrationnumber
        const query = {
            text: 'SELECT * FROM users WHERE registrationnumber = $1',
            values: [`${request.session.registrationnumber}`],
        }  
        pool.query(query, (err, result) => {
            if (err){
                console.log(err);
            }
            //console.log(result.rows[0])
            response.render("views/userProfile", { model: result.rows[0]});
        });
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	//response.end();
});



/*app.get('/admin', (req, res) => {
    const user = selectUser(req.cookies.token);
    if (user["rule"] == "admin") {
        res.render('views/adminProfile', { admin: user });
    } else {
        res.send("Sem autorização");
    }
});*/

app.get("/admin/:id", (request, response) => {
    if (request.session.loggedin) {
		// Output username
		//response.send('Welcome back, ' + request.session.registrationnumber + '!');
        //const id = req.session.registrationnumber
        const query = {
            text: 'SELECT * FROM users WHERE registrationnumber = $1',
            values: [`${request.session.registrationnumber}`],
        }  
        pool.query(query, (err, result) => {
            if (err){
                console.log(err);
            }
            //console.log(result.rows[0])
            response.render("views/adminProfile", { model: result.rows[0]});
        });
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	//response.end();
});

app.get('/logout', (req, res) => {
    res.cookie('token', null);
    res.redirect('/login');
});

app.get('/editarUsuario', (req, res) => {
    const user = selectUser(req.query.profile);
    res.render('views/editUserProfile.ejs', { user: user });
});
/*app.get('/login', (req, res) => {
    var user = selectUser(req.cookies.token);
    if (user == null) {
        res.render('views/login');
    } else {
        if (user["rule"] == "user") {
            res.redirect("/usuario");
        } else if (user["rule"] == "admin") {
            res.redirect("/admin");
        }
    }
});*/

app.get('/login', (req, res)=>{
    res.render('views/login');
});

/*app.post('/login', (req, res) => {
    var user = selectUser(req.body.registrationNumber);
    if(user == null) res.redirect("/login");
    if (checkPassword(req.body.password, descriptografar(user["password"]))) {
        res.cookie('token', req.body.registrationNumber);
        if (user["rule"] == "user") {
            res.redirect("/usuario");
        } else if (user["rule"] == "admin") {
            res.redirect("/admin");
        }
    } else {
        res.redirect("/login");
    }
});*/
app.post('/login', (request, response) =>{
    let registrationnumber = request.body.registrationnumber;
    let password = request.body.password;
    //console.log(registrationnumber);
    //console.log(password);
    
    //const id = req.params.id;
    //const user = [id, req.body.name, req.body.email];
    //const sql = "UPDATE users SET name = $2, email = $3 WHERE (id = $1)";
    const query = {
        text: 'SELECT * FROM users WHERE registrationnumber = $1 AND password = $2',
        values: [`${request.body.registrationnumber}`, `${request.body.password}`],
        //result: res.rows[0][data],
 
    }    
    if(registrationnumber && password){
        pool.query(query, (err, result)=>{
            if (err){
                console.log(err)
            }
        
            //done();
            //console.log(result.rows[0].id);
            //console.log(result.rows[0].rule)
            if (result.rows[0].id) {
                // Authenticate the user
                request.session.loggedin = true;
                request.session.registrationnumber = registrationnumber;
                if(result.rows[0].rule == 'admin'){
                    response.redirect('/admin/:id');
                }
                else{
                    // Redirect to home page
                    response.redirect('/usuario/:id');
                }
            } else {
                response.send('Incorrect Registration Number and/or Password!');
            }			
            response.end();
        });
    }
    else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});





//Sample code within your app
//var express = require('express')
//var bodyParser = require('body-parser')

//var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// POST /edit/ (CRUD edit)
app.post("/edit/:id", (req, res) =>{
    const id = req.params.id;
    //const user = [id, req.body.name, req.body.email];
    //const sql = "UPDATE users SET name = $2, email = $3 WHERE (id = $1)";
    const query = {
        text: 'UPDATE users SET name = $2, email = $3 WHERE (id = $1)',
        values: [id, `${req.body.name}`, `${req.body.email}`],
    }
    pool.query(query, (err)=>{
        if (err){
            console.log(err)
        }
        res.redirect("/user");
    });
    /*pool.query(sql, user, (err, result) => {
      if (err){
          console.log(err)
      }
      res.redirect("/user");
    });*/
});
app.post("/usuario/edit/:id", (req, res) =>{
    const id = req.params.id;
    //const user = [id, req.body.name, req.body.email];
    //const sql = "UPDATE users SET name = $2, email = $3 WHERE (id = $1)";
    const query = {
        text: 'UPDATE users SET name = $2, email = $3 WHERE (id = $1)',
        values: [id, `${req.body.name}`, `${req.body.email}`],
    }
    pool.query(query, (err)=>{
        if (err){
            console.log(err)
        }
        res.redirect("/usuario");
    });
    /*pool.query(sql, user, (err, result) => {
      if (err){
          console.log(err)
      }
      res.redirect("/user");
    });*/
});
// POST /delete/5
app.post("/delete/:id", (req, res) =>{
    const id = req.params.id;
    //const user = [id, req.body.name, req.body.email];
    //const sql = "UPDATE users SET name = $2, email = $3 WHERE (id = $1)";
    const query = {
        text: 'DELETE FROM users WHERE (id = $1)',
        values: [`${req.params.id}`],
    }
    pool.query(query, (err)=>{
        if (err){
            console.log(err)
        }
        res.redirect("/user");
    });
    /*pool.query(sql, user, (err, result) => {
      if (err){
          console.log(err)
      }
      res.redirect("/user");
    });*/
});
// POST /create
app.post("/create", upload.single('imagesrc'), (req, res) => {
    //const sql = "INSERT INTO users (name, email, registrationnumber) VALUES ($1, $2, $3)";
    //const user = [req.body.name, req.body.email, req.body.matricula];
    const query = {
        text: 'INSERT INTO users (name, imagesrc, email, registrationnumber, favoritedish, time, enablenotifications, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        values: [`${req.body.name}`, `/img/${req.file.filename}`, `${req.body.email}`, `${req.body.registrationnumber}`, `${req.body.favoritedish}`, `${req.body.time}`, `${req.body.enablenotifications}`, `${req.body.password}`],
    }
    pool.query(query, (err) => {
      if (err){
          console.log(err);
      }
      res.redirect("/user");
    });
  });

app.get('/sobre', (req, res) => {
    res.render('views/about/index');
});

app.get('/sobre/horario', (req, res) => {
    res.render('views/about/data/time');
});

app.get('/sobre/ru', (req, res) => {
    res.render('views/about/data/ru');
});

app.get('/sobre/valor', (req, res) => {
    res.render('views/about/data/value');
});

app.get("/user", (req, res) => {
    const sql = "SELECT * FROM users"
    pool.query(sql, [], (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("views/user", { model: result.rows });
    });
});

// GET /edit/5
app.get("/usuario/edit/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM users WHERE id = $1";
    pool.query(sql, [id], (err, result) => {
      if (err){
          console.log(err);
      }
      res.render("views/edit", { model: result.rows[0] });
    });
});

app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM users WHERE id = $1";
    pool.query(sql, [id], (err, result) => {
      if (err){
          console.log(err);
      }
      res.render("views/edit", { model: result.rows[0] });
    });
});

// GET /create
app.get("/create", (req, res) => {
    res.render("views/create", { model: {} });
});

// GET /delete/5
app.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM users WHERE id = $1";
    pool.query(sql, [id], (err, result) => {
      if (err){
        console.log(err);
      }
      res.render("views/delete", { model: result.rows[0]});
    });
});

app.listen(3000, () => console.log(`App listening on port!`));

function criptografar(text) {
    const cipher = crypto.createCipher(alg, pwd)
    const crypted = cipher.update(text, 'utf8', 'hex')
    return crypted
}

function descriptografar(text) {
    const decipher = crypto.createDecipher(alg, pwd)
    const plain = decipher.update(text, 'hex', 'utf8')
    return plain
}