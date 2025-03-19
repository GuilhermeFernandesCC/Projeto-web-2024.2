export const InvalidInputFill = (message:string): Error => {
    const error = new Error("Bad Request: Campos mal prenchidos: "+message);
    (error as any).statusCode = 400;
    return error;
};