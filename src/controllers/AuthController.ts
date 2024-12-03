import type { Request , Response  } from "express"
import User from "../models/Users";
import { hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { transport } from "../config/nodemailer";
import { AuthEmail } from "../emails/AuthEmail";


export class AuthController { 
    static createAccount = async ( req: Request , res: Response ) => {
        try {
            const { password , email } = req.body;
            //Prevenir duplicados
            const userExists = await User.findOne({ email })
            if( userExists ){ 
                const error = new Error('El usuario ya esta registrado')
                return res.status(409).json({ error: error.message });
            }
            //Crear usuario
            const user = new User( req.body );
            //Hash password
            user.password = await hashPassword( password )
            //Generar token
            const token = new Token();
            //Enviar email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.email,
                token: token.token,
            })
            await transport.sendMail({
                from: 'UpTask <admin@admin.com>',
                to: user.email,
                subject: 'UpTask - Confirma tu cuenta',
                text: 'UpTask - Confirma tu cuenta',
                html: '<p>Probando e-mail</p>'
            })

            token.token = generateToken()
            token.user =  user.id;
            await Promise.allSettled([ user.save() , token.save() ]);
            res.send('Cuenta creada exitosamente , revisa tu correo para confirmar')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error'})
        }
    }

    static confirmAccount = async ( req: Request , res: Response ) => {
        try {
            const { token } = req.body;

            const tokenExists = await Token.findOne({ token });
            if( !tokenExists ) { 
                const error = new Error('Token no válido');
                return res.status(401).json({ error: error.message })
            }
            const user = await User.findById( tokenExists.user )
            user.confirmed = true
            await Promise.allSettled([ user.save() , tokenExists.deleteOne() ]);
            res.send('Cuenta confirmada correctamente');
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error'})
        }
    }
}