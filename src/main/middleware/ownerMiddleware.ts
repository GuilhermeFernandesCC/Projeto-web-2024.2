import { PrismaClient } from '@prisma/client';
import {Request, Response, NextFunction} from 'express';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
    user?: {id:number,email:string};
}

export const checkOwner = (model: "user"):any => {
    return async (req: AuthRequest, res: Response, next:NextFunction)=>{
        const {id} = req.params;
        console.log(id)
        const userId = req.user?.id;
        console.log(req.user)
        console.log('##'+userId)
        if (!userId){
            return res.status(401).json({message:"Usuário não autenticado"})
        }

        const resource = await prisma[model].findUnique({where: {id:Number(id)}});

        if (!resource) {
            return res.status(404).json({message:`${model} não encontrado.`})
        }

        if (resource.id !== userId){
            return res.status(403).json({message:"Acesso negado: você não é o dono deste objeto"})
        }
        next();
    }
}

export const checkTableOwner = (model: "table"):any => {
    return async (req: AuthRequest, res: Response, next:NextFunction)=>{
        const {id} = req.params;
        const userId = req.user?.id;
        if (!userId){
            return res.status(401).json({message:"Usuário não autenticado"})
        }

        const resource = await prisma[model].findUnique({where: {id:Number(id)}});

        if (!resource) {
            return res.status(404).json({message:`${model} não encontrado.`})
        }

        if (resource.masterId !== userId){
            return res.status(403).json({message:"Acesso negado: você não é o dono deste objeto"})
        }
        next();
    }
}