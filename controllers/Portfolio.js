const fs = require("fs");
const path = require("path");
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
    Portfolio.findById(req.params.id)
        .then(project => {
            if (!project) {
                return res.status(404).json({ error: "Projet introuvable !" });
            }
            const data = { ...req.body };
            if (data.skills) data.skills = JSON.parse(data.skills);
            if (data.link) data.link = JSON.parse(data.link);
            if(req.file) {
                if (project.imageUrl) {
                    const oldFileName = project.imageUrl.split("/images/")[1];
                    const oldFilePath = path.join(__dirname, "../images/", oldFileName);
                    fs.unlink(oldFilePath, err => {
                        if (err) console.error("Erreur lors de la suppression de l'ancienne image :", err);
                    });
                }
                data.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
            }
            Portfolio.findByIdAndUpdate(req.params.id, data, { new: true })
                .then(project => res.status(200).json(project))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteProject = (req, res, next) => {
    Portfolio.findById(req.params.id)
        .then(project => {
            if (!project) {
                return res.status(404).json({ error: "Projet introuvable !" })
            }
            const filename = project.imageUrl.split("/images/")[1];
            const filePath = path.join(__dirname, "../images/", filename);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Erreur lors de la suppression du fichier :", err);
                }
                Portfolio.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Projet supprimé avec succès !" }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(500).json({ error }));
};