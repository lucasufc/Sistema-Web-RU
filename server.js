const express = require('express');

const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/assets'));

app.set('views', path.join(__dirname, '/'));

function selectUser(profile) {
    var user = {
        name: "Glauton Santos",
        imageSrc: "/img/perfil-glauton-santos.jpg",
        email: "glautoncardoso@gmail.com",
        registrationNumber: "404201",
        favoriteDish: "Frango frito",
        time: "13:00",
        enableNotifications: "Sim"
    }
    var user2 = {
        name: "Lucas Martins",
        imageSrc: "/img/perfil-lucas-martins.jpeg",
        email: "lucasmartins@gmail.com",
        registrationNumber: "404206",
        favoriteDish: "Fígado",
        time: "11:00",
        enableNotifications: "Não"
    }
    var user3 = {
        name: "Victor Santos",
        imageSrc: "/img/perfil-victor-santos.jpeg",
        email: "victorsantos@gmail.com",
        registrationNumber: "404205",
        favoriteDish: "Estrogonofe de carne",
        time: "12:30",
        enableNotifications: "Sim"
    }
    var user4 = {
        name: "Anderson Leandro",
        imageSrc: "/img/perfil-anderson-leandro.jpeg",
        email: "andersonleandro@gmail.com",
        registrationNumber: "404203",
        favoriteDish: "Feijoada",
        time: "12:00",
        enableNotifications: "Não"
    }

    if(profile == user2['registrationNumber']) {
        user = user2;
    } else if (profile == user3['registrationNumber']) {
        user = user3;
    } else if (profile == user4['registrationNumber']) {
        user = user4;
    }
    return user;
}

app.get('/', (req, res) => {
    res.render('views/index', { desjejum: desjejum, restaurants: restaurants });
});

app.get('/usuario', (req, res) => {
    const user = selectUser(req.query.profile);
    res.render('views/userProfile', { user: user });
});

app.get('/admin', (req, res) => {
    const admin = {
        name: "Admin",
        imageSrc: "/img/admin.jpg",
        email: "glautoncardoso@gmail.com",
        registrationNumber: "404201",
    }
    res.render('views/adminProfile', { admin: admin });
});

app.get('/editarUsuario', (req, res) => {
    const user = selectUser(req.query.profile);
    res.render('views/editUserProfile.ejs', { user: user });
});

app.get('/cadastro', (req, res) => {
    res.render('views/registration');
});

app.get('/login', (req, res) => {
    res.render('views/login');
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
