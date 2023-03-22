const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


exports.showClients = async (req, res, next) => {
    try {
        const allClients = await prisma.Client.findMany()
        console.log(allClients);
        return allClients;
    } catch (error) {
        res.status(500).json({
            error,
        });
        console.log(error);
    }
};