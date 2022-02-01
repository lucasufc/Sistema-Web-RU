const express = require('express');
const crypto = require('crypto')
const alg = 'aes-256-ctr'
const pwd = 'abcdabcd'
const path = require('path');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/assets'));

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

app.get('/usuario', (req, res) => {
    const user = selectUser(req.cookies.token);
    if (user["rule"] == "user") {
        res.render('views/userProfile', { user: user });
    } else {
        res.send("Sem autorização");
    }
});

app.get('/admin', (req, res) => {
    const user = selectUser(req.cookies.token);
    if (user["rule"] == "admin") {
        res.render('views/adminProfile', { admin: user });
    } else {
        res.send("Sem autorização");
    }
});

app.get('/logout', (req, res) => {
    res.cookie('token', null);
    res.redirect('/login');
});

app.get('/editarUsuario', (req, res) => {
    const user = selectUser(req.query.profile);
    res.render('views/editUserProfile.ejs', { user: user });
});

app.get('/cadastro', (req, res) => {
    res.render('views/registration');
});

app.get('/login', (req, res) => {
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
});

app.post('/login', (req, res) => {
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