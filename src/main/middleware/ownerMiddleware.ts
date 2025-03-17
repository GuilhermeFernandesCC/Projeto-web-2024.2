import { PrismaClient } from '@prisma/client';
import {Request, Response, NextFunction} from 'express';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
    user?: {id:number,email:string};
}

export const checkOwner = ():any => {
    return async (req: AuthRequest, res: Response, next:NextFunction)=>{
        const {id} = req.params;
        const userId = req.user?.id;
        if (!userId){
            return res.status(401).json({message:"Usuário não autenticado"})
        }

        const resource = await prisma['user'].findUnique({where: {id:Number(id)}});

        if (!resource) {
            return res.status(404).json({message:`Usuário não encontrado.`})
        }

        if (resource.id !== userId){
            return res.status(403).json({message:"Acesso negado: você não é o dono deste objeto"})
        }
        next();
    }
}

export const checkTableOwner = ():any => {
    return async (req: AuthRequest, res: Response, next:NextFunction)=>{
        const tableId = req.params.id
        const userId = req.user?.id;
        if (!userId){
            return res.status(401).json({message:"Usuário não autenticado"})
        }

        const resource = await prisma['table'].findUnique({where: { id:Number(tableId)}});
        
        if (!resource) {
            return res.status(404).json({message:`Table não encontrado.`})
        }

        if (resource.masterId !== userId){
            return res.status(403).json({message:"Acesso negado: você não é o dono deste objeto"})
        }
        next();
    }
}