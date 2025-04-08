
import {Router,Request,Response, NextFunction}from 'express';
import { TableAddDto } from '../Dto/tableAddDto';
import { addPlayerTableService, removePlayerTableService, tableAddService, tableDeleteService, tableGetAllService, tableGetPlayersServices, tableGetService, tableUpdateService } from '../service/tableService';
import { authenticate } from '../middleware/authMiddleware';
import { checkTableOwner } from '../middleware/ownerMiddleware';
import { TableUpdateDto } from '../Dto/tableUpdateDto';
import { UserNotFound } from '../error/userNotFound';

interface AuthRequest extends Request {
    user?: {id:number,email:string};
}
const router = Router();
/**
 * @swagger
 * /table/add:
 *   post:
 *     summary: Adiciona uma nova mesa
 *     description: Esta rota adiciona uma nova mesa ao banco de dados.
 *     tags:
 *       - Mesas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: Mesa adicionado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.post('/add' ,authenticate,async (req: AuthRequest, res: Response , next:NextFunction):Promise<any> => {
    
    if(!req.user?.id){
        throw UserNotFound();
    }
    const tableDto:TableAddDto = req.body;
    
    tableDto.masterId = Number(req.user?.id)
    
    const result = await tableAddService(tableDto);

    return res.status(201).json(result);

});

/**
 * @swagger
 * /table/get/{id}:
 *   get:
 *     summary: Retorna uma mesa pelo id
 *     description: Esta rota retorna uma mesa do banco de dados.
 *     tags:
 *       - Mesas
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
    const result = await tableGetService(Number(req.params.id));
    return res.status(200).json(result);

})

/**
 * @swagger
 * /table/getall:
 *   get:
 *     summary: Retorna todas as mesas
 *     description: Esta rota retorna todas as mesa do banco de dados.
 *     tags:
 *       - Mesas
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Sucessoo
 *       500:
 *         description: Erro no servidor
 */
router.get('/getall',async ( req:Request,res: Response , next:NextFunction):Promise<any> =>{
    const result = await tableGetAllService();
    return res.status(200).json(result);

})
/**
 * @swagger
 * /table/delete/{id}:
 *   delete:
 *     summary: Deleta uma mesa pelo id
 *     description: Esta rota deleta uma mesa do banco de dados.
 *     tags:
 *       - Mesas
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Mesa não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/delete/:id',authenticate,checkTableOwner(),async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const result = await tableDeleteService(Number(req.params.id));
    return res.status(200).json(result);
})
/**
 * @swagger
 * /table/update/{id}:
 *   put:
 *     summary: Atualiza uma mesa pelo id
 *     description: Esta rota atualiza uma mesa do banco de dados.
 *     tags:
 *       - Mesas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Mesa não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put('/update/:id',authenticate,checkTableOwner(),async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const updateTableDto = req.body;
    const result = await tableUpdateService(Number(req.params.id),updateTableDto);
    return res.status(200).json(result);
})

/**
 * @swagger
 * /table/addPlayer/:id:
 *   post:
 *     summary: Adiciona um player em uma mesa
 *     description: Adiciona um player em uma mesa, pelo id da mesa e email do usuário
 *     tags:
 *       - Mesas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Mesa não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.post('/addPlayer/:id',authenticate,checkTableOwner(),async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const emailUser = String(req.body.email)
    const result = await addPlayerTableService(emailUser,Number(req.params.id));
    return res.status(200).json(result);
})

/**
 * @swagger
 * /table/removePlayer/:id:
 *   delete:
 *     summary: Remove um player em uma mesa
 *     description: Remove um player em uma mesa, pelo id da mesa e email do usuário
 *     tags:
 *       - Mesas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Mesa não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/removePlayer/:id',authenticate,checkTableOwner(),async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const emailUser = String(req.body.email)
    const result = await removePlayerTableService(emailUser,Number(req.params.id));
    return res.status(200).json(result);
})

/**
 * @swagger
 * /table/getPlayers/:id:
 *   delete:
 *     summary: Retorna players de uma mesa
 *     description: Retorna players de uma mesa
 *     tags:
 *       - Mesas
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Mesa não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/getPlayers/:id',authenticate,async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const result = await tableGetPlayersServices(Number(req.params.id));
    return res.status(200).json(result);
})

export default router;