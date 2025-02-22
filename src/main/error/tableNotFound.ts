export const TableNotFound = (): Error => {
    const error = new Error("Mesa não encontrada");
    (error as any).statusCode = 404;
    return error;
};