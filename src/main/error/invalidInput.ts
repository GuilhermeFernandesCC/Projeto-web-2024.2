export const InvalidInput = (): Error => {
    const error = new Error("Bad Request: Entrada Inválida, tente novamente");
    (error as any).statusCode = 400;
    return error;
};