export const emailAlreadyUsed = (): Error => {
    const error = new Error("Bad Request: Email já cadastrado.");
    (error as any).statusCode = 400;
    return error;
};