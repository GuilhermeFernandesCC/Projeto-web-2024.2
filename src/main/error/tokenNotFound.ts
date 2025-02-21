export const TokenNotFound = (): Error => {
    const error = new Error("Token não encontrado");
    (error as any).statusCode = 404;
    return error;
};