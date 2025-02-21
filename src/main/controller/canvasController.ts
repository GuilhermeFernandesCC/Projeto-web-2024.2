import {Router,Request,Response, NextFunction}from 'express';
import { CanvasAddDto } from '../Dto/canvasAddDto';
import { canvasAddService } from '../service/canvasService';

const router = Router();

/**
 * @swagger
 * /canvas/add:
 *   post:
 *     summary: Adiciona um novo Canvas
 *     description: Esta rota adiciona um novo Canvas ao banco de dados.
 *     tags:
 *       - Mesas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: Canvas adicionado com sucesso
 *       404:
 *         description: Mesa não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.post('/add', async (req: Request, res: Response , next:NextFunction):Promise<any> => {
    const canvasDto:CanvasAddDto = req.body;

    const result = await canvasAddService(canvasDto);

    return res.status(201).json(result);

});

export default router