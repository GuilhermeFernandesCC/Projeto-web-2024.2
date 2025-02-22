export const CanvasNotFound = (): Error => {
    const error = new Error("Canvas não encontrado");
    (error as any).statusCode = 404;
    return error;
};