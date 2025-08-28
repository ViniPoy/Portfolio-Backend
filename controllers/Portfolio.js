const Portfolio = require ("../models/Portfolio");

exports.getAllProjects = (req, res, next) => {
    Portfolio.find()
        .then(projects => res.status(200).json(projects))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneProject = (req, res, next) => {
    Portfolio.findById(req.params.id)
        .then(project => res.status(200).json(project))
        .catch(error => res.status(400).json({ error }));
};

exports.createProject = (req, res, next) => {
    const project = new Portfolio(req.body);
    project.save()
        .then(() => res.status(201).json({ message: "Projet ajouté !" }))
        .catch(error => res.status(400).json({ error }));
};

exports.updateProject = (req, res, next) => {
    Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(project => res.status(200).json(project))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteProject = (req, res, next) => {
    Portfolio.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: "Projet supprimé !" }))
        .catch(error => res.status(400).json({ error }));
};