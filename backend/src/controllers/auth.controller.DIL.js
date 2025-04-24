import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loginUserDIL = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ msg: "Incorrect password" });
        }

        const token = jwt.sign(
            {
                id: Number(user.identificacion),
                email: user.email,
                rol: user.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            msg: "Login successful",
            token,
            user: {
                id: Number(user.identificacion),
                fullname: user.fullname,
                email: user.email,
                rol: user.rol
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ msg: "Invalid or expired token." });
    }
};
