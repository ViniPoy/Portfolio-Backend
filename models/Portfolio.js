const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    imageUrl: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    skills: {type: [String], required: true},
    link: {
        github: { type: String, default: null },
        site: { type: String, default: null }
    }
});

module.exports = mongoose.model("Portfolio", portfolioSchema);