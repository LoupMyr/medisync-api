const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient()


const authentification = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ "error": "Missing required fields: email, password" });
    }
    try {
        // Trouver l'utilisateur par email
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        // Si l'utilisateur n'existe pas, retourner une erreur
        if (!user) {
            return res.status(401).json({ "error": "Invalid email or password" });
        }

        // Comparer les mots de passe
        const match = await bcrypt.compare(password, user.password);

        // Si les mots de passe ne correspondent pas
        if (!match) {
            return res.status(401).json({ "error": "Invalid email or password" });
        }

        // Générer un token JWT si authentification réussie
        const token = jwt.sign({ id: user.id }, "test", {
            algorithm: 'HS256',
            expiresIn: '1h',
        });

        // Retourner la réponse avec le token et les données utilisateur
        return res.json({
            "message": "success",
            "token": token,
            "data": { id: user.id, email: user.email },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ "error": "An error occurred during authentication" });
    }
};


function hashPasswordSync(password) {
    try {

        const hashedPassword = bcrypt.hashSync(password, 12);


        return hashedPassword;
    } catch (error) {
        throw new Error('Failed to hash password');
    }
}
module.exports = {
    authentification
};