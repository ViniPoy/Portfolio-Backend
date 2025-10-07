const nodemailer = require('nodemailer');

exports.sendContactMessage = async (req, res, next) => {
    const { name, email, object, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Champs manquants.' });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: 'pro3.mail.ovh.net',
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        await transporter.verify();
        console.log('Serveur SMTP prêt à envoyer des mails');

        await transporter.sendMail({
            from: `"Portfolio VL" <${process.env.MAIL_USER}>`,
            to: process.env.MAIL_TO || process.env.MAIL_USER,
            subject: object || "Nouveau message depuis le formulaire de contact",
            text:`
            Bonjour,

            Nom : ${name}
            Email : ${email}
            Objet : ${object || '(non précisé)'}
            Message :
            ${message}

            Cordialement,
            Le formulaire de contact du portfolio.
            `,
        });
        res.status(200).json({ message: 'Message envoyé avec succès.' });
    } catch (error) {
        console.error('Erreur envoi email', error);
        res.status(500).json({ message: 'Erreur serveur, message non envoyé.' });
    } 
};

