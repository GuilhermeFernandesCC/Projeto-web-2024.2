import {NextFunction,Request,Response } from 'express'

const errorMiddleware = (error: any, req : Request, res : Response, next:NextFunction):any =>  {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({message: error.message||"Internal Serve Error"});
}

export default errorMiddleware 