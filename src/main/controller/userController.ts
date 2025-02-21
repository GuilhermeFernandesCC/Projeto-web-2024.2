import {Router,Request,Response, NextFunction}from 'express';
import { runInContext } from "vm";
import { userAddService,userGetService } from '../service/userService';
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
 *         description: Erro de validação
 *       500:
 *         description: Erro no servidor
 */
router.post('/add', async (req: Request, res: Response , next:NextFunction):Promise<any> => {
    const userDto:UserAddDto = req.body;

	const result = await userAddService(userDto);

    return res.status(201).json(result);

});

router.get('/get/:id',async ( req:Request,res: Response , next:NextFunction):Promise<any> =>{
    const result = await userGetService(Number(req.params.id));
    return res.status(200).json(result);

})
/*
router.delete('/delete/:id',async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const result = await userDeleteService(Number(req.params.id));
    return res.status(201).json(result);
})

router.put('/update/:id',async (req:Request,res:Response, next:NextFunction):Promise<any> => {
    const updateUserDto = req.body;
    const result = await userUpdateService(Number(req.params.id),updateUserDto);
    return res.status(201).json(result);
})
*/
export default router;