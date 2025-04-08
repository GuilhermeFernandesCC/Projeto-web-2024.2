import {NextFunction, Request, Response, Router} from 'express';
import {comparePassword, generateToken} from '@utils/auth';
import { userGetByEmailService } from '@service/userService';

const router = Router()
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login Auth
 *     description: Esta rota realiza o login.
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Sucesso no Login
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Erro no servidor durante login
 */
router.post('/login', async (req: Request, res:Response, next:NextFunction):Promise<any> => {
    const {email, password} = req.body;
    
    try {
        // Verifica se o usuário existe;
        const user = await userGetByEmailService(email);
        if (!user) {
            return res.status(400).json({message: 'Invalid email'});
        }

        // Compara a senha fornecida com a senha armazenada
        const isPasswordValid = await comparePassword(password, user.senha);
        if (!isPasswordValid){
            return res.status(400).json({message: 'Invalid password'});
            
        }

        // Gera um token JWT
        const token = generateToken(user.id,user.email);
        res.status(200).json({message:'Login successful',token});

    } catch (err) {
        res.status(500).json({message:'Error logging in',error:err})
    }
})

export default router;