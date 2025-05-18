import { PrismaClient } from "@prisma/client";
import PDFDocument from "Pdfkit";
const prisma = new PrismaClient();

function serializePet(pet) {
    return {
        ...pet,
        User_id: pet.User_id.toString(),
        user: pet.user
        ? {
            ...pet.user,
            identificacion: pet.user.identificacion.toString(),
            }
        : null,
    };
}

export const createPetDIL = async (req, res) => {
    try {
        const { race_id, category_id, gender_id, User_id, name, estado, latitude, longitude } = req.body;
        if (isNaN(race_id) || isNaN(category_id) || isNaN(gender_id) || isNaN(User_id)) {
            return res.status(400).json({ msg: "Valores de ID inválidos" });
        }

        if (latitude && longitude) {
            if (isNaN(latitude) || isNaN(longitude)) {
                return res.status(400).json({ msg: "Latitud o longitud inválidas" });
            }
        }
        const photo = req.file ? req.file.filename : null;
        const pet = await prisma.pets.create({
            data: {
                race: { connect: { id: Number(race_id) } },
                category: { connect: { id: Number(category_id) } },
                gender: { connect: { id: Number(gender_id) } },
                user: { connect: { identificacion: BigInt(User_id) } },
                name,
                photo,
                estado,
                latitude: latitude ? parseFloat(latitude) : null,
                longitude: longitude ? parseFloat(longitude) : null,
            },
            include: {
                race: true,
                category: true,
                gender: true,
                user: true
            }
        });

        res.status(201).json({ 
            msg: "Mascota creada exitosamente", 
            pet: serializePet(pet) 
        });

    } catch (error) {
        console.error("Error en createPetfjbs:", error);
        res.status(500).json({ 
            msg: "Error interno del servidor",
            error: error.message 
        });
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
        res.status(200).json(pets.map(serializePet));
    } catch (error) {
        console.error("Error en getPetsDIL:", error);
        res
        .status(500)
        .json({ msg: "Error interno del servidor", error: error.message });
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
        res.status(200).json(serializePet(pet));
        } else {
        res.status(404).json({ msg: "Mascota no encontrada" });
        }
    } catch (error) {
        console.error("Error en getPetByIdDIL:", error);
        res
        .status(500)
        .json({ msg: "Error interno del servidor", error: error.message });
    }
};

export const updatePetDIL = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, estado, currentPhoto } = req.body;
        const race_id = parseInt(req.body.race_id);
        const category_id = parseInt(req.body.category_id);
        const gender_id = parseInt(req.body.gender_id);
        const User_id = BigInt(req.body.User_id);

        const newPhoto = req.file ? req.file.filename : currentPhoto;

        const pet = await prisma.pets.update({
            where: { id: Number(id) },
            data: {
                race_id,
                category_id,
                gender_id,
                User_id,
                name,
                photo: newPhoto,
                estado,
            },
            include: {
                race: true,
                category: true,
                gender: true,
                user: true,
            },
            });

            res.status(200).json({
            msg: "Mascota actualizada exitosamente",
            pet: serializePet(pet),
            });
        } catch (error) {
            console.error("Error en updatePetDIL:", error);
            res
            .status(500)
            .json({ msg: "Error interno del servidor", error: error.message });
        }
};

export const deletePetDIL = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.pets.delete({
        where: { id: Number(id) },
        });
        res.status(200).json({ msg: "Mascota eliminada exitosamente" });
    } catch (error) {
        console.error("Error en deletePetDIL:", error);
        res
        .status(500)
        .json({ msg: "Error interno del servidor", error: error.message });
    }
    };

export const getPetsReportDIL = async (req, res) => {
    try {
        const petsByStatus = await prisma.pets.groupBy({
        by: ["estado"],
        _count: { estado: true },
        });

        const adoptedPets = await prisma.pets.findMany({
        where: { estado: "Adoptado" },
        include: {
            race: true,
            category: true,
            gender: true,
            user: true,
        },
        });

        const availablePets = await prisma.pets.findMany({
        where: { estado: "Disponible" },
        include: {
            race: true,
            category: true,
            gender: true,
            user: true,
        },
    });

    const doc = new PDFDocument({ margin: 30, size: "A4" });
        res.setHeader(
        "Content-Disposition",
        "attachment; filename=reporte_mascotas.pdf"
        );
        res.setHeader("Content-Type", "application/pdf");
        doc.pipe(res);

        doc
        .fontSize(18)
        .text("REPORTE DE MASCOTAS ADOPTADOS/DISPONIBLES", { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text("Resumen por estado:");
        petsByStatus.forEach((status) => {
        doc
            .fontSize(12)
            .text(`- ${status.estado}: ${status._count.estado} mascotas`);
        });
        doc.moveDown();

        doc.fontSize(14).text("Mascotas Adoptadas:");
        adoptedPets.forEach((pet, idx) => {
        doc.fontSize(12).text(`Nombre: ${pet.name}`);
        doc.text(`  Raza: ${pet.race?.name || "N/A"}`);
        doc.text(`  Categoría: ${pet.category?.name || "N/A"}`);
        doc.text(`  Género: ${pet.gender?.name || "N/A"}`);
        doc.text(`  Usuario: ${pet.user?.fullname || "N/A"}`);
        doc.moveDown();
        });

        doc.addPage();
        doc.fontSize(14).text("Mascotas Disponibles:");
        availablePets.forEach((pet, idx) => {
        doc.fontSize(12).text(`Nombre: ${pet.name}`);
        doc.text(`  Raza: ${pet.race?.name || "N/A"}`);
        doc.text(`  Categoría: ${pet.category?.name || "N/A"}`);
        doc.text(`  Género: ${pet.gender?.name || "N/A"}`);
        doc.text(`  Usuario: ${pet.user?.fullname || "N/A"}`);
        doc.moveDown();
        });

        doc.end();
    } catch (error) {
        console.error("Error en getPetsReportDIL:", error);
        res
        .status(500)
        .json({ msg: "Error interno del servidor", error: error.message });
    }
};

export const getPetsGraphDIL = async (req, res) => {
        try {
        const resumen = await prisma.pets.groupBy({
        by: ['estado'],
        _count: { estado: true },
        });

        res.json(resumen);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener resumen", error: error.message });
    }

    };

