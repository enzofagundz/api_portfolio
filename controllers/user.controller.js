const { Prisma } = require('@prisma/client');
const PrismaClass = require('../database/prisma/prisma.class');
const p = PrismaClass.getPrisma();

class UserController {
    async index(req, res) {
        try {
            const users = await p.user.findMany();
            return res.json(users);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async store(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await p.user.create({
                data: {
                    name,
                    email,
                    password
                }
            });
            PrismaClass.disconnect();
            return res.json(user);
        } catch (error) {
            PrismaClass.disconnect();
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new UserController();