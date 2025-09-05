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
    try {
        const data = { ...req.body };
        if (data.skills) {
            data.skills = JSON.parse(data.skills);
        }
        if (data.link) {
            data.link = JSON.parse(data.link);
        }
        if (req.file) {
            data.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        }
        if (!data.category) {
            return res.status(400).json({ error: "Category is required" });
        }
        const project = new Portfolio(data);
        project.save()
            .then((savedProject) => res.status(201).json(savedProject))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
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