import {Request, Response} from 'express';
import {comparePassword, generateToken} from '../utils/auth';
import { userGetByEmailService } from '../service/userService';

export const login = async (req: Request, res:Response) => {
    const {email, password} = req.body;
    
    try {
        // Verifica se o usuário existe;
        const user = await userGetByEmailService(email);
        if (!user) {
            return res.status(400).json({message: 'Invalid username or password'});
        }

        // Compara a senha fornecida com a senha armazenada
        const isPasswordValid = await comparePassword(password, user.senha);
        if (!isPasswordValid){
            return res.status(400).json({message: 'Invalid username or password'});
            
        }

        // Gera um token JWT
        const token = generateToken(user.id,user.email);
        
        res.status(200).json({message:'Login successful',token});

    } catch (err) {
        res.status(500).json({message:'Error logging in',error:err})
    }
}