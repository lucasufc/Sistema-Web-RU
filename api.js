const express = require('express');
const router = express.Router();
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


// HOME

router.get('/', function(req, res) {
    res.render('./views/index');
  });

// ABOUT
router.get('/sobre', (req, res) => {
    res.render('./views/about/index');
});

router.get('/sobre/horario', (req, res) => {
    res.render('./views/about/data/time');
});

router.get('/sobre/ru', (req, res) => {
    res.render('./views/about/data/ru');
});

router.get('/sobre/valor', (req, res) => {
    res.render('.//views/about/data/value');
});

// LOGIN

router.get('/login', (req, res)=>{
    res.render('views/login');
});

router.post('/login', (request, response) =>{
    let registrationnumber = request.body.registrationnumber;
    let password = request.body.password;

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

// LOGOUT
router.get('/logout', (req, res) => {
    res.cookie('token', null);
    res.redirect('/login');
});
const blacklist = [];

router.post('/logout', (req,res) => {
    blacklist.push(req.headers['x-access-token']);
    res.end();
});

// USER

router.get("/usuario/:id", (request, response) => {
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
});

// ADMIN


router.get("/admin/:id", (request, response) => {
    if (request.session.loggedin) {

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

});


// USER (EDIT)
router.get('/editarUsuario', (req, res) => {
    const user = selectUser(req.query.profile);
    res.render('views/editUserProfile.ejs', { user: user });
});

//CRUD DO SISTEMA
router.post("/edit/:id", (req, res) =>{
    const id = req.params.id;
    const query = {
        text: 'UPDATE users SET name = $2, email = $3 WHERE (id = $1)',
        values: [id, `${req.body.name}`, `${req.body.email}`],
    }
    pool.query(query, (err)=>{
        if (err){
            console.log(err)
        }
        res.redirect(`/usuario/${id}`);
    });
});
router.post("/admin/edit/:id", (req, res) =>{
    const id = req.params.id;
    const query = {
        text: 'UPDATE users SET name = $2, email = $3 WHERE (id = $1)',
        values: [id, `${req.body.name}`, `${req.body.email}`],
    }
    pool.query(query, (err)=>{
        if (err){
            console.log(err)
        }
        res.redirect("/admin");
    });
});
router.post("/delete/:id", (req, res) =>{
    const id = req.params.id;
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
});
router.post("/create", upload.single('imagesrc'), (req, res) => {
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
router.get("/user", (req, res) => {
    const sql = "SELECT * FROM users"
    pool.query(sql, [], (err, result) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("views/user", { model: result.rows });
    });
});
router.get("/usuario/edit/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM users WHERE id = $1";
    pool.query(sql, [id], (err, result) => {
      if (err){
          console.log(err);
      }
      res.render("views/edit", { model: result.rows[0] });
    });
});
router.get("/admin/edit/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM users WHERE id = $1";
    pool.query(sql, [id], (err, result) => {
      if (err){
          console.log(err);
      }
      res.render("views/edit", { model: result.rows[0] });
    });
});
router.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM users WHERE id = $1";
    pool.query(sql, [id], (err, result) => {
      if (err){
          console.log(err);
      }
      res.render("views/edit", { model: result.rows[0] });
    });
});
router.get("/create", (req, res) => {
    res.render("views/create", { model: {} });
});
router.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM users WHERE id = $1";
    pool.query(sql, [id], (err, result) => {
      if (err){
        console.log(err);
      }
      res.render("views/delete", { model: result.rows[0]});
    });
});

module.exports = router;