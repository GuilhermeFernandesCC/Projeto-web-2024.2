import {Router,Request,Response, NextFunction}from 'express';
import { userAddService,userGetService,userDeleteService, userUpdateService, userGetAllService,tablesAsMasterService,tablesAsPlayerService } from '@service/userService';
import { UserAddDto } from "@Dto/userAddDto";
import { authenticate } from '@middleware/authMiddleware'
import { checkOwner } from '@middleware/ownerMiddleware';

const router = Router();
interface AuthRequest extends Request {
    user?: {id:number,email:string};
}

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
 *         description: Bad Request - Email já cadastrado
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
 * /user/getPerfil
 *   get:
 *     summary: Retorna perfil do usuário logado
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
router.get('/getPerfil',authenticate,async ( req:AuthRequest,res: Response , next:NextFunction):Promise<any> =>{
    const result = await userGetService(Number(req.user?.id));
    return res.status(200).json(result);
})

/**
 * @swagger
 * /user/getall:
 *   get:
 *     summary: Recupera todos Usuários.
 *     description: Esta rota Retorna todos usuários do banco de dados.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Sucesso
 *       500:
 *         description: Erro no servidor
 */
router.get('/getall',async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const result = await userGetAllService();
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
router.delete('/delete/:id',authenticate,checkOwner(),async (req:Request,res:Response, next:NextFunction):Promise<any> => {
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
router.put('/update/:id',authenticate,checkOwner(),async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const updateUserDto = req.body;
    const result = await userUpdateService(Number(req.params.id),updateUserDto);
    return res.status(200).json(result);
})

/**
 * @swagger
 * /user/getTablesAsMaster:
 *   get:
 *     summary: Recupera mesas que o usuário é mestre
 *     description: 
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
router.get('/getTablesAsMaster',authenticate,async (req:AuthRequest,res:Response, next:NextFunction):Promise<any> => {
    
    const result = await tablesAsMasterService(Number(req.user?.id));
    return res.status(200).json(result);
})

/**
 * @swagger
 * /user/getTablesAsPlayer:
 *   get:
 *     summary: Recupera mesas que o usuário é jogador
 *     description: 
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
router.get('/getTablesAsPlayer',authenticate,async (req:AuthRequest,res:Response, next:NextFunction):Promise<any> => {
    const result = await tablesAsPlayerService(Number(req.user?.id));
    return res.status(200).json(result);
})



export default router;