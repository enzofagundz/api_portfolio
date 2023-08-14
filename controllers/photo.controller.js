const { Prisma } = require('@prisma/client');
const PrismaClass = require('../database/prisma/prisma.class');
const p = PrismaClass.getPrisma();

class PhotoController {
    async store(req, res) {
        try {
            const { url, projectId } = req.body;
            const photo = await p.photo.create({
                data: {
                    url,
                    project: {
                        connect: {
                            id: projectId
                        }
                    }
                }
            });

            PrismaClass.disconnect();
            return res.status(201).json(photo);
        }
        catch (error) {
            PrismaClass.disconnect();
            return res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        try {
            const { projectId } = req.params;

            const photo = await p.photo.findMany({
                where: {
                    projectId: parseInt(projectId)
                }
            });

            PrismaClass.disconnect();
            return res.status(200).json(photo);
        } catch (error) {
            PrismaClass.disconnect();
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PhotoController();