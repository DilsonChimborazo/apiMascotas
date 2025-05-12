import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import dotenv from 'dotenv';
import cors from 'cors';

import { UserRouter } from './src/routers/user.router.DIL.js';
import { LoginRouter } from './src/routers/auth.router.DIL.js';
import { genderRouter } from './src/routers/genders.router.DIL.js';
import { categoryRouter } from './src/routers/category.router.DIL.js';
import { petRouter } from './src/routers/pets.router.DIL.js';
import { raceRouter } from './src/routers/race.router.DIL.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Carpeta de imágenes
app.use('/images', express.static('images'));  

// Cargar la documentación Swagger
const swaggerDocument = YAML.load('./src/docs/swagger.yaml');
app.use('/document', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routers
app.use(UserRouter);
app.use(LoginRouter);
app.use(genderRouter);
app.use(categoryRouter);
app.use(petRouter);
app.use(raceRouter);

// Iniciar servidor
app.listen(3000, '0.0.0.0', () => {
    console.log(`Servidor iniciado en http://192.168.101.7:3000`);
    console.log(`Documentación en http://192.168.101.7:3000/document`);
});
