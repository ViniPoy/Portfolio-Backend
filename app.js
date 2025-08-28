const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const portfolioRoutes = require("./routes/Portfolio");
const adminRoutes = require("./routes/Admin");

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connexion à mongoDB réussie !'))
    .catch(error => console.error('Connexion à mongoDB échouée :', error));

const allowedOrigins = [
    "http://localhost:4000",
    "https://vinipoy.github.io/Portfolio/"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    allowedHeaders: "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
}));

app.use(express.json());

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/auth", adminRoutes);

module.exports = app;