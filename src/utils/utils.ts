import { QueryTypes, Sequelize } from 'sequelize'
import colors from 'colors'
import { MessageController } from '../controller/Message.controller';

export const checkAndProcessMessages = async (db: Sequelize) => {
    try {
        const result: any[] = await db.query(
            "SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'database_personalite') as exists_table",
            { type: QueryTypes.SELECT }
        );

        const tableExists = result.length > 0 && result[0].exists_table;

        if (tableExists) {
            console.log(colors.bgBlue.white.bold('La tabla "database_personalite" existe, procesando mensajes...\n'));
            await MessageController.ProcessQueue();
        } else {
            console.log(colors.bgYellow.white.bold('La tabla "database_personalite" aún no existe, esperando...'));
        }
    } catch (error) {
        console.error(colors.bgRed.white.bold('Error verificando la tabla "database_personalite"'), error);
    }
};