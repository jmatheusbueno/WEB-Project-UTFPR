// config inicial
const express = require('express');
const mongoose = require('mongoose');
const bp = require('body-parser')

const app = express();



// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended:true,
    }),
);
app.use(express.json());

// rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({ message: 'ok!' });
});

// entregar uma porta
const DB_USER = 'joao';
const DB_PASSWORD = encodeURIComponent('zftXr5wsKSKVmcUu');

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@projetoweb.7mldl.mongodb.net/projeto_web?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.use(bp.json())
    app.use(bp.urlencoded({ extended: true }))
        app.listen(3000);
    })
    .catch((err) => console.log(err));

// rotas
const musicRoutes = require('./routes/musicRoutes');
app.use('/music', musicRoutes);

const loginRoutes = require('./routes/loginRoutes');
app.use('/login', loginRoutes);