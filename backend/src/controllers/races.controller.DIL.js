import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createRaceDIL = async (req, res) => {
    try {
        const { name } = req.body;
        const race = await prisma.races.create({
            data: { name },
        });
        res.status(200).json({ msg: "Race created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getRacesDIL = async (req, res) => {
    try {
        const races = await prisma.races.findMany();
        res.status(200).json(races);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getRaceByIdDIL = async (req, res) => {
    try {
        const { id } = req.params;
        const race = await prisma.races.findUnique({
            where: { id: Number(id) },
        });
        if (race) {
            res.status(200).json(race);
        } else {
            res.status(404).json({ msg: "Race not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateRaceDIL = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const race = await prisma.races.update({
            where: { id: Number(id) },
            data: { name },
        });
        res.status(200).json({ msg: "Race updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const deleteRaceDIL = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.races.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({ msg: "Race deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
