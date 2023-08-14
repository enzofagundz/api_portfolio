const { Prisma } = require('@prisma/client');
const PrismaClass = require('../prisma/prisma.class');
const p = PrismaClass.getPrisma();

class ProjectController {
    async index (req, res) {
        try {
            const projects = await p.project.findMany({
                include: {
                    photos: true
                },
                orderBy: {
                    id: 'asc'
                }
            })
        } catch (error) {
            PrismaClass.disconnect();
            return res.status(400).json({ error: error.message });
        }
    }

    async show (req, res) {
        try {
            const { id } = req.params;
            const project = await p.project.findUnique({
                where: {
                    id: Number(id)
                },
                include: {
                    photos: true
                }
            })
            PrismaClass.disconnect();
            return res.json(project);
        } catch (error) {
            PrismaClass.disconnect();
            return res.status(400).json({ error: error.message });
        }
    }

    async store (req, res) {
        try {
            const { name, description, logo, url, conclusion } = req.body;

            const project = await p.project.create({
                data: {
                    name,
                    description,
                    logo,
                    url,
                    conclusion
                }
            })
            PrismaClass.disconnect();
            return res.json(project);
        } catch (error) {
            PrismaClass.disconnect();
            return res.status(400).json({ error: error.message });
        }
    }

    async update (req, res) {
        try {
            const { id } = req.params;
            const { name, description, logo, url, conclusion } = req.body;

            const project = await p.project.update({
                where: {
                    id: Number(id)
                }, 
                data: {
                    name,
                    description,
                    logo,
                    url,
                    conclusion
                }
            })
        } catch (error) {
            PrismaClass.disconnect();
            return res.status(400).json({ error: error.message });
        }
        
    }
}

module.exports = new ProjectController();