import {Router,Request,Response, NextFunction}from 'express';
import { userAddService,userGetService,userDeleteService, userUpdateService } from '../service/userService';
import { UserAddDto } from '../Dto/userAddDto';


const router = Router();


/**
 * @swagger
 * /user/add:
 *   post:
 *     summary: Adiciona um novo usuário
 *     description: Esta rota adiciona um novo usuário ao banco de dados.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: Usuário adicionado com sucesso
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Erro no servidor
 */
router.post('/add', async (req: Request, res: Response , next:NextFunction):Promise<any> => {
    const userDto:UserAddDto = req.body;

	const result = await userAddService(userDto);

    return res.status(201).json(result);

});
/**
 * @swagger
 * /user/get/{id}:
 *   get:
 *     summary: Retorna um usuário pelo id
 *     description: Esta rota retorna um  usuário ao banco de dados.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/get/:id',async ( req:Request,res: Response , next:NextFunction):Promise<any> =>{
    const result = await userGetService(Number(req.params.id));
    return res.status(200).json(result);

})
/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo id.
 *     description: Esta rota deleta um usuário do banco de dados.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/delete/:id',async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const result = await userDeleteService(Number(req.params.id));
    return res.status(200).json(result);
})
/**
 * @swagger
 * /user/update/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo id.
 *     description: Esta rota Atualiza um usuário do banco de dados.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put('/update/:id',async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const updateUserDto = req.body;
    const result = await userUpdateService(Number(req.params.id),updateUserDto);
    return res.status(200).json(result);
})

export default router;