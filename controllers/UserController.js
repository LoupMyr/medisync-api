const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()



const getUsers = (async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users)
});


const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

const GetMedicamentsByUserID = async (req, res) => {
    const { id } = req.params;
    try {
        const medicaments = await prisma.medicament.findMany({
            where: {
                userId: parseInt(id),
            },
        });
        if (medicaments.length > 0) {
            res.json(medicaments);
        } else {
            res.status(404).json({ error: 'No medicaments found for this user' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};


module.exports = {
    getUsers,
    getUserById,
    GetMedicamentsByUserID
}