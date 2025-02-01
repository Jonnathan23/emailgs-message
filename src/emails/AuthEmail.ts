import { transport } from "../config/nodeMailer"
import colors from "colors"
interface IEmail {
    email: string,
    nombre: string,
    link: string
}

export class AuthEmail {
    static SendEmail = async (user: Pick<IEmail, 'email' | 'nombre' | 'link'>) => {
        const info = await transport.sendMail({
            from: `BiblioImage <admin@bibioimage.com>`,
            to: user.email,
            subject: 'Imagen Subida a BiblioImage',
            text: 'Imagen Subida a BiblioImage',
            html:
                `
                <div style="width: 90%; margin: 0 auto;">
                    <div
                        style="background-color: rgb(71, 61, 255); width: 100%; display: flex; justify-content: center; align-items: center; height: 50px; color: #ffff;">
                        <h1>Hola ${user.nombre}</h1>
                    </div>
                    <p>Se te informa que tu imagen se ha subido con exito, aquí está su enlace:
                        <span style="font-weight: bold; cursor: pointer;">
                            <a style="color: rgb(71, 61, 255);" href="${user.link}">${user.link}</a>
                        </span>
                    </p>
                </div>
                `
        })
        console.log(colors.green.bold(`Email enviado  ${info.messageId}`))
    }
}