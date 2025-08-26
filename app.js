const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connexion à mongoDB réussie !'))
    .catch(() => console.log('Connexion à mongoDB échouée !'));

app.use((req, res, next) => {
    console.log('Requête reçue');
    next();
})

app.use((req, res, next) => {
    res.status(201);
    next();
})

app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçu' });
    next();
});

app.use((req, res, next) => {
    console.log('Réponse envoyé avec succès !');
})

module.exports = app;