import {Router,Request,Response, NextFunction}from 'express';
import { CanvasAddDto } from '../Dto/canvasAddDto';
import { canvasAddService, canvasDeleteService, canvasGetService, canvasUpdateService } from '../service/canvasService';

const router = Router();

/**
 * @swagger
 * /canvas/add:
 *   post:
 *     summary: Adiciona um novo Canvas
 *     description: Esta rota adiciona um novo Canvas ao banco de dados.
 *     tags:
 *       - Canvas
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

/**
 * @swagger
 * /canvas/get/id:
 *   get:
 *     summary: Retorna um Canvas
 *     description: Esta rota retorna um Canvas do banco de dados.
 *     tags:
 *       - Canvas
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Canvas retornado com sucesso
 *       404:
 *         description: Canvas não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/get/:id',async ( req:Request,res: Response , next:NextFunction):Promise<any> =>{
    const result = await canvasGetService(Number(req.params.id));
    return res.status(200).json(result);

})

/**
 * @swagger
 * /canvas/delete/id:
 *   delete:
 *     summary: Deleta um Canvas
 *     description: Esta rota deleta um Canvas do banco de dados.
 *     tags:
 *       - Canvas
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Canvas deletado com sucesso
 *       404:
 *         description: Canvas não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/delete/:id',async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const result = await canvasDeleteService(Number(req.params.id));
    return res.status(200).json(result);
})
/**
 * @swagger
 * /canvas/update/id:
 *   put:
 *     summary: Atualizar um Canvas
 *     description: Esta rota atualizar um Canvas do banco de dados.
 *     tags:
 *       - Canvas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Canvas atualizado com sucesso
 *       404:
 *         description: Canvas não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put('/update/:id',async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const canvasUserDto = req.body;
    const result = await canvasUpdateService(Number(req.params.id),canvasUserDto);
    return res.status(200).json(result);
})
export default router