import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategoryDIL = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await prisma.categories.create({
            data: { name },
        });
        res.status(201).json({ msg: "Category created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


export const getCategoriesDIL = async (req, res) => {
    try {
        const categories = await prisma.categories.findMany();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getCategoryByIdDIL = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await prisma.categories.findUnique({
            where: { id: Number(id) },
        });
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ msg: "Category not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateCategoryDIL = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const category = await prisma.categories.update({
            where: { id: Number(id) },
            data: { name },
        });
        res.status(200).json({ msg: "Category updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


export const deleteCategoryDIL = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.categories.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({ msg: "Category deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
