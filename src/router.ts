import { Router } from "express";
import { handleInputErrors } from "./middleware";
import { MessageController } from "./controller/Message.controller";
import { body } from "express-validator";


export const router = Router()

router.post('/',
    body('email')
        .isEmail().withMessage('El campo email debe ser un email valido')
        .notEmpty().withMessage('El campo email es requerido'),
    body('nombre').notEmpty().withMessage('El campo nombre es requerido'),
    body('link').notEmpty().withMessage('El campo link es requerido'),
    handleInputErrors,
    MessageController.SendMails
)

router.post('/queue',
    body('email')
        .isEmail().withMessage('El campo email debe ser un email valido')
        .notEmpty().withMessage('El campo email es requerido'),
    body('nombre')
        .notEmpty().withMessage('El campo nombre es requerido'),
    body('link').notEmpty().withMessage('El campo link es requerido'),
    handleInputErrors,
    MessageController.QueueMessage
)

router.get('/queue',
    handleInputErrors,
    MessageController.GetQueueMessage
)