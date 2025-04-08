import { Request,Response,NextFunction } from "express";
import {verifyToken} from "../utils/auth"

interface AuthRequest extends Request {
    user?: {id:number,email:string};
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction):any =>  {
    let token = req.header('Authorization')?.replace('Beares','');
    if(!token) {
        return res.status(401).json({message:'Access denied. No token provided'});
    }
    
    token = token.split(" ")[1]

    try {
        const decoded = verifyToken(token);
        req.user = decoded; //Adiciona o usuário decodificado ao objeto 'req'
        next();
    }catch (err){
        res.status(400).json({message:'Invalid token.'});
    }
};