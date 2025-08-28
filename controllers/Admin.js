const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.login =(req, res, next) => {
    Admin.findOne({ email: req.body.email })
        .then( admin => {
            if (!admin) {
                return res.status(401).json({ message: "Paire identifiant / mot de passe incorrecte." });
            }
            bcrypt.compare(req.body.password, admin.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: "Paire identifiant / mot de passe incorrecte." });
                    }
                    res.status(200).json({
                        adminId: admin._id,
                        token: jwt.sign(
                            { adminId: admin._id },
                            process.env.TOKEN_SECRET,
                            { expiresIn: "24h" }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};