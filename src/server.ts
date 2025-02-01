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

dotenv.config()

export const connectDb = async () => {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.bgGreen.white.bold('Base de datos conectada'))

        // Verificar si la tabla Messages existe en pg_tables
        const result: any[] = await db.query(
            "SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'Messages') as exists_table",
            { type: QueryTypes.SELECT }
        );

        const tableExists = result.length > 0 && result[0].exists_table;

        if (tableExists) {
            console.log(colors.bgBlue.white.bold('La tabla Messages existe, procesando mensajes...'));
            await MessageController.ProcessQueue();
        } else {
            console.log(colors.bgYellow.white.bold('La tabla Messages aún no existe, no se procesarán mensajes.'));
        }
    } catch (error) {
        console.log(colors.bgRed.white.bold('Error al conectar la base de datos'))
    }
}

connectDb()

const app = express()
app.use(cors(corsConfig))

app.use(morgan('dev'))
app.use(express.json())
app.use('/messages', router)


export default app