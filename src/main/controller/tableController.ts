import { Table } from '@prisma/client';
import {Router,Request,Response, NextFunction}from 'express';
import { TableAddDto } from '../Dto/tableAddDto';
import { tableAddService, tableDeleteService, tableGetService } from '../service/tableService';


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
router.post('/add', async (req: Request, res: Response , next:NextFunction):Promise<any> => {
    const tableDto:TableAddDto = req.body;

    const result = await tableAddService(tableDto);

    return res.status(201).json(result);

});

/**
 * @swagger
 * /table/get/{id}:
 *   post:
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
 * /table/delete/{id}:
 *   post:
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
router.delete('/delete/:id',async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const result = await tableDeleteService(Number(req.params.id));
    return res.status(200).json(result);
})


export default router;