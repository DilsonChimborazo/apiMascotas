import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createGenderDIL = async (req, res) => {
    try {
        const { name } = req.body;
        const gender = await prisma.genders.create({
            data: { name },
        });
        res.status(201).json({ msg: "Gender created successfully", gender });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


export const getGendersDIL = async (req, res) => {
    try {
        const genders = await prisma.genders.findMany();
        res.status(200).json(genders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getGenderByIdDIL = async (req, res) => {
    try {
        const { id } = req.params;
        const gender = await prisma.genders.findUnique({
            where: { id: Number(id) },
        });
        if (gender) {
            res.status(200).json(gender);
        } else {
            res.status(404).json({ msg: "Gender not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


export const updateGenderDIL = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const gender = await prisma.genders.update({
            where: { id: Number(id) },
            data: { name },
        });
        res.status(200).json({ msg: "Gender updated successfully", gender });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


export const deleteGenderDIL = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.genders.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({ msg: "Gender deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
