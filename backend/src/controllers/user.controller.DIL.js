import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUserDIL = async (req, res) => {
    try {
        const {identificacion, fullname, email, password, rol } = req.body;

        if (!password) {
            return res.status(400).json({ msg: "Password is required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
            data: {
                identificacion,
                fullname,
                email,
                password: hashedPassword,
                rol
            }
        });

        res.status(200).json({ msg: "The user was created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getUserDIL = async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        const usersResponse = users.map(user => ({
            ...user,
            identificacion: user.identificacion.toString(), 
        }));

        if (users.length > 0) {
            res.status(200).json(usersResponse);
        } else {
            res.status(400).json({ msg: 'Error getting users' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

export const getUserByIdDIL = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await prisma.users.findUnique({
            where: { identificacion: Number(id) },
        });

        if (user) {
            res.status(200).json({
                ...user,
                identificacion: user.identificacion.toString(),  
            });
        } else {
            res.status(404).json({ msg: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

export const updateUserDIL = async (req, res) => {
    try {
        const { id } = req.params;
        const {fullname, email, password, rol } = req.body;
        let updatedData = { fullname, email, rol };
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10); 
        }

        const user = await prisma.users.update({
            where: { identificacion: Number(id) },
            data: updatedData,
        });

        if (user) {
            res.status(200).json({ msg: 'Updated user successfully' });
        } else {
            res.status(400).json({ msg: 'Error updating user' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

export const deleteUserDIL = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.users.delete({
            where: { identificacion: Number(id) },
        });
        res.json({ message: "Cliente eliminado exitosamente" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
};
