import {Router,Request,Response, NextFunction}from 'express';
import { TokenAddDto } from '../Dto/tokenAddDto';
import { tokenAddService, tokenDeleteService, tokenGetAllService, tokenGetService, tokenUpdateService } from '../service/tokenService';
import { authenticate } from '../middleware/authMiddleware';
import { UserNotFound } from '../error/userNotFound';
import { checkOwner, checkTokenOwner } from '../middleware/ownerMiddleware';

interface AuthRequest extends Request {
    user?: {id:number,email:string};
}

const router = Router();

/**
 * @swagger
 * /token/add:
 *   post:
 *     summary: Adiciona um novo Token
 *     description: Esta rota adiciona um novo Token ao banco de dados.
 *     tags:
 *       - Tokens
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: Tokens adicionado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.post('/add',authenticate, async (req: AuthRequest, res: Response , next:NextFunction):Promise<any> => {
    
    if(!req.user?.id){
        throw UserNotFound();
    }
    const tokenDto:TokenAddDto = {userId:req.user?.id}
    const result = await tokenAddService(tokenDto);
    return res.status(201).json(result);

});

/**
 * @swagger
 * /token/get/id:
 *   get:
 *     summary: Retorna um Token
 *     description: Esta rota retorna um Token do banco de dados.
 *     tags:
 *       - Tokens
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Token retornado com sucesso
 *       404:
 *         description: Token não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/get/:id',async ( req:Request,res: Response , next:NextFunction):Promise<any> =>{
    const result = await tokenGetService(Number(req.params.id));
    return res.status(200).json(result);

})

/**
 * @swagger
 * /token/getall:
 *   get:
 *     summary: Retorna todos os tokens
 *     description: Esta rota retorna todos os Tokens do banco de dados.
 *     tags:
 *       - Tokens
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Tokens retornado com sucesso
 *       500:
 *         description: Erro no servidor
 */
router.get('/getall',async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const result = await tokenGetAllService();
    return res.status(200).json(result);
})
/**
 * @swagger
 * /token/delete:
 *   delete:
 *     summary: Deleta o Token do usuário logado
 *     description: Esta rota deleta um Tokens do banco de dados.
 *     tags:
 *       - Tokens
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Token deletado com sucesso
 *       404:
 *         description: Token não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/delete',authenticate,checkTokenOwner(),async (req:AuthRequest,res:Response, next:NextFunction):Promise<any> => {
    if(!req.user?.id){
        throw UserNotFound();
    }
    console.log(req.user.id)
    const result = await tokenDeleteService(Number(req.user.id));
    return res.status(200).json(result);
})
/**
 * @swagger
 * /token/update:
 *   put:
 *     summary: Atualizar o token do usuário logado
 *     description: Esta rota atualizar um Token do banco de dados.
 *     tags:
 *       - Tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Token atualizado com sucesso
 *       404:
 *         description: Token não encontrado ou Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put('/update/:id',authenticate,async (req:AuthRequest,res:Response, next:NextFunction):Promise<any> => {
    if(!req.user?.id){
        throw UserNotFound();
    }
    const tokenUserDto = req.body;
    const result = await tokenUpdateService(Number(req.params.id),tokenUserDto);
    return res.status(200).json(result);
})
export default router