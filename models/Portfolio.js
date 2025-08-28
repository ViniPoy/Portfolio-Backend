const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    imageUrl: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    skills: {type: [String], required: true},
    link: {type: String, required: true}
});

module.exports = mongoose.model("Portfolio", portfolioSchema);