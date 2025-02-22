export const UserNotFound = (): Error => {
    const error = new Error("Usuário não encontrado");
    (error as any).statusCode = 404;
    return error;
};