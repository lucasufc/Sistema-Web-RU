const express = require('express');
const router = express.Router();
require('./')
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

router.delete("/delete/:id", (req, res) =>{
   // const id = req.params.id;
    const query = {
        text: 'DELETE FROM users WHERE (id = $1)',
        values: [`${req.params.id}`],
    }
    pool.query(query, (err)=>{
        if (err){
            console.log(err)
        }
        res.status(200).end('sucesso!');
    });
});

router.post("/create", upload.single('imagesrc'), (req, res) => {
    console.log(req.body.name);
    const query = {
        text: 'INSERT INTO users (name, imagesrc, email, registrationnumber, favoritedish, time, enablenotifications, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        values: [`${req.body.name}`, `assets\img\perfil-glauton-santos.jpg`, `${req.body.email}`, `${req.body.registrationnumber}`, `${req.body.favoritedish}`, `${req.body.time}`, `${req.body.enablenotifications}`, `${req.body.password}`],
    }
    pool.query(query, (err) => {
      if (err){
          console.log(err);
      }
      res.status(200).end('sucesso!');
    });

  });
  router.put("/edit/:id", (req, res) =>{
    const id = req.params.id;
    //console.log('asdklf')
    const query = {
        text: 'UPDATE users SET name = $2, email = $3 WHERE (id = $1)',
        values: [id, `${req.body.name}`, `${req.body.email}`],
    }
    pool.query(query, (err)=>{
        if (err){
            console.log(err)
        }
        res.status(200).end('sucesso!');
    });
});
  module.exports = router;