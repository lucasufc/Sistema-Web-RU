const express = require('express');

const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/assets'));

app.set('views', path.join(__dirname, '/'));

app.get('/', (req, res) => {
    const desjejum = {
        bebidas: [ '0x1F964','Bebidas', 'Café', 'Leite Quente / Frio (Contém Lactose)', 'Leite de Soja', 'Suco de Maracujá' ],
        paes: [ '0x1F35E',' Pães','Pão Carioca (Contém Glúten)' ,'Pão Sovado (Contém Glúten)' ],
        frutas: ['0x1F34E',' Frutas', 'Laranja', 'Melão Espanhol'],
        especial: ['0x1F31F',' Especial', 'Achocolatado (Contém Lactose)', 'Bolo (Contém Lactose e Glúten)']
    }
    const restaurants =  {
        pici1: ['Pici I', '100','15'],
        pici2: ['Pici II', '100', '45'],
        benfica: ['Benfica', '100', '60'],
        porangabucu: ['Porangabuçu', '100', '90']
    }
    res.render('views/index', { desjejum: desjejum, restaurants: restaurants });
});

app.get('/usuario', (req, res) => {
    const user = {
        name: "Glauton Santos",
        imageSrc: "/img/perfil.jpg",
        email: "glautoncardoso@gmail.com",
        registrationNumber: "404201",
        favoriteDish: "Frango frito",
        time: "13:00",
        enableNotifications: "Sim"
    }
    res.render('views/userProfile', { user: user });
});

app.get('/admin', (req, res) => {
    const admin = {
        name: "Glauton Santos",
        imageSrc: "/img/perfil.jpg",
        email: "glautoncardoso@gmail.com",
        registrationNumber: "404201",
        favoriteDish: "Frango frito",
        time: "13:00",
        enableNotifications: "Sim"
    }
    res.render('views/adminProfile', { admin: admin });
});

app.get('/cadastro', (req, res) => {
    res.render('views/registration');
});

app.get('/login', (req, res) => {
    res.render('views/login');
});

app.listen(3000, () => console.log(`App listening on port!`));