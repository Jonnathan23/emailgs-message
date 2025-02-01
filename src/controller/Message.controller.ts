import { Request, Response } from 'express'
import Message from '../models/Message.model'
import { AuthEmail } from '../emails/AuthEmail'

export class MessageController {
    static SendMails = async (req: Request, res: Response) => {
        try {
            const { email, nombre, link } = req.body

            await AuthEmail.SendEmail({ email, nombre, link })

            res.status(200).send('Message sent')
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static QueueMessage = async (req: Request, res: Response) => {
        try {
            const messages = new Message(req.body)
            await messages.save()

            res.status(200).send('Message added to queue')
        } catch (error) {
            console.log(error)
            res.status(500).json({ errors: error })
        }
    }

    static GetQueueMessage = async (req: Request, res: Response) => {
        try {
            const messages = await Message.findAll()

            res.status(200).json({ data: messages })
        } catch (error) {
            res.status(500).json({ errors: error })
        }
    }

    static ProcessQueue = async () => {
        try {
            const messages = await Message.findAll()

            if (messages.length === 0 || messages === null || messages === undefined) throw new Error('No messages in queue')

            for (const message of messages) {
                const { email, nombre, link } = message
                await AuthEmail.SendEmail({ email, nombre, link })

                await message.destroy()
                console.log(`Email sent and message deleted for: ${message.nombre}`)
            }
        } catch (error) {
            console.log(error)
        }
    }
}