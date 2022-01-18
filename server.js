const express = require('express');

const path = require('path');

const app = express();app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '/'));app.get('/', (req, res) => {
    var dados = ['valor 1', 'valor 2', 'valor 3', 'valor 4'];
    res.render('myView', { dadosDaView: dados });
});

app.listen(3000, () => console.log(`App listening on port!`));