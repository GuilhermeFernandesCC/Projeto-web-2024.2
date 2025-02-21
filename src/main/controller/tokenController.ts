import {Router,Request,Response, NextFunction}from 'express';
import { TokenAddDto } from '../Dto/tokenAddDto';
import { tokenAddService, tokenGetService, tokenUpdateService } from '../service/tokenService';
import { canvasDeleteService } from '../service/canvasService';

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
 *       required: true
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
router.post('/add', async (req: Request, res: Response , next:NextFunction):Promise<any> => {
    const tokenDto:TokenAddDto = req.body;

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
 *         description: Tokens retornado com sucesso
 *       404:
 *         description: Tokens não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/get/:id',async ( req:Request,res: Response , next:NextFunction):Promise<any> =>{
    const result = await tokenGetService(Number(req.params.id));
    return res.status(200).json(result);

})

/**
 * @swagger
 * /token/delete/id:
 *   delete:
 *     summary: Deleta um Token
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
router.delete('/delete/:id',async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const result = await canvasDeleteService(Number(req.params.id));
    return res.status(200).json(result);
})
/**
 * @swagger
 * /token/update/id:
 *   put:
 *     summary: Atualizar um Token
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
 *         description: Token não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put('/update/:id',async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const tokenUserDto = req.body;
    const result = await tokenUpdateService(Number(req.params.id),tokenUserDto);
    return res.status(200).json(result);
})
export default router