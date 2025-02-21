import { Table } from '@prisma/client';
import {Router,Request,Response, NextFunction}from 'express';
import { TableAddDto } from '../Dto/tableAddDto';
import { tableAddService } from '../service/tableService';


const router = Router();
/**
 * @swagger
 * /user/add:
 *   post:
 *     summary: Adiciona um novo usuário
 *     description: Esta rota adiciona uma nova mesa ao banco de dados.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: Mesa adicionado com sucesso
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Erro no servidor
 */
router.post('/add', async (req: Request, res: Response , next:NextFunction):Promise<any> => {
    const tableDto:TableAddDto = req.body;

    const result = await tableAddService(tableDto);

    return res.status(201).json(result);

});

export default router;