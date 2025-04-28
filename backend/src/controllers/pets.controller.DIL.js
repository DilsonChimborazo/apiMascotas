import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPetDIL = async (req, res) => {
    try {
        const { race_id, category_id, genders_id, Users_id, photo, estado } = req.body;
        const pet = await prisma.pets.create({
            data: {
                race_id,
                category_id,
                genders_id,
                Users_id,
                photo,
                estado,
            },
        });
        res.status(200).json({ msg: "Pet created successfully", pet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getPetsDIL = async (req, res) => {
    try {
        const pets = await prisma.pets.findMany({
            include: {
                race: true,
                category: true,
                gender: true,
                user: true,
            },
        });
        res.status(200).json(pets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


export const getPetByIdDIL = async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await prisma.pets.findUnique({
            where: { id: Number(id) },
            include: {
                race: true,
                category: true,
                gender: true,
                user: true,
            },
        });
        if (pet) {
            res.status(200).json(pet);
        } else {
            res.status(404).json({ msg: "Pet not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


export const updatePetDIL = async (req, res) => {
    try {
        const { id } = req.params;
        const { race_id, category_id, genders_id, Users_id, photo, estado } = req.body;
        const pet = await prisma.pets.update({
            where: { id: Number(id) },
            data: {
                race_id,
                category_id,
                genders_id,
                Users_id,
                photo,
                estado,
            },
        });
        res.status(200).json({ msg: "Pet updated successfully", pet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const deletePetDIL = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.pets.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({ msg: "Pet deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
