import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import dotenv from 'dotenv';
import { UserRouter } from './src/routers/user.router.DIL.js';
import { LoginRouter } from './src/routers/auth.router.DIL.js';
import { genderRouter } from './src/routers/genders.router.DIL.js';
import { categoryRouter } from './src/routers/category.router.DIL.js';
import { petRouter } from './src/routers/pets.router.DIL.js';
import { raceRouter } from './src/routers/race.router.DIL.js';


dotenv.config();
const app = express();

// Cargar el archivo de configuración de Swagger
const swaggerDocument = YAML.load('./src/docs/swagger.yaml');

// Middleware para servir Swagger UI
app.use('/document', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware para procesar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(UserRouter)
app.use(LoginRouter)
app.use(genderRouter)
app.use(categoryRouter)
app.use(petRouter)
app.use(raceRouter)

// Iniciar el servidor
app.listen(3000, () => {
    console.log(`Servidor iniciado en el puerto http://localhost:3000`);
    console.log(`Documentación disponible en http://localhost:3000/document`);
});
