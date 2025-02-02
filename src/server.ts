import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { corsConfig } from './config/cors'
import db from './config/db'
import colors from 'colors'
import { router } from './router'
import { MessageController } from './controller/Message.controller'
import { QueryTypes } from 'sequelize'
import { checkAndProcessMessages } from './utils/utils'

dotenv.config()

export const connectDb = async () => {
    try {
        await db.authenticate();
        await db.sync({ alter: true }); // Asegura que la tabla esté sincronizada sin eliminar datos
        console.log(colors.bgGreen.white.bold('Base de datos conectada'));
       
        // Ejecutar la función por primera vez
        await checkAndProcessMessages(db);

        // Establecer intervalo de 3 segundos para seguir verificando
        setInterval(() => checkAndProcessMessages(db), 3000);

    } catch (error) {
        console.log(colors.bgRed.white.bold('Error al conectar la base de datos'), error);
    }
};

connectDb()

const app = express()
app.use(cors(corsConfig))

app.use(morgan('dev'))
app.use(express.json())
app.use('/messages', router)


export default app