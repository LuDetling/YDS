const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


/* A function that is used to get all the clients of a user. */
exports.getClients = async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    try {
        const getClients = await prisma.Clients.findMany({
            where: {
                userId
            }
        })
        if (!getClients) {
            return res.status(401).json({
                error: "Utilisateur non trouvé !",
            });
        }
        res.status(200).json({
            getClients,
        })
    } catch (error) {
        res.status(500).json({
            error,
        });
    }
};
/* A function that is used to add a client to a user. */
exports.addClients = async (req, res, next) => {
    const userId = parseInt(req.params.userId)
    try {
        const addClients = await prisma.Clients.create({
            data: {
                userId,
                name: req.body.name,
                workdates: [],
            }
        })
        return res.status(201).json({
            addClients,
        })
    } catch (error) {
        res.status(500).json({
            error
        })
        console.log(error);
    }
}

/* A function that is used to delete a client from a user. */
exports.deleteClients = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userId);
        const client = await prisma.Clients.findUnique({
            where: {
                id: req.body.id,
            }
        })
        if (userId !== client.userId) {
            return res.status(401).json({
                error: "Vous ne pouvez pas supprimer ce client !"
            })
        }
        const deletedClient = await prisma.Clients.delete({
            where: {
                id: req.body.id,
            }
        })
        return res.status(200).json({
            deletedClient,
        })
    } catch (error) {
        console.log("error");
        res.status(401).json({
            error
        })
    }
}

exports.updateClients = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userId);
        const client = await prisma.Clients.findUnique({
            where: {
                id: req.body.id,
            }
        })
        if (userId !== client.userId) {
            return res.status(401).json({
                error: "Vous ne pouvez pas modifier ce client !"
            })
        }
        const updateClients = await prisma.Clients.update({
            where: {
                id: req.body.id,
            },
            data: {
                name: req.body.name,
                workdates: req.body.workdates,
            }
        })
        return res.status(200).json({
            updateClients,
        })
    } catch (error) {
        console.log("error");
        res.status(401).json({
            error
        })
    }
}