import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'SenhaSuperSegura'
console.log("Secret: "+JWT_SECRET)
// Função para criptografar

export const hashPassword = async (password: string): Promise<string> => {
    console.log("HASHPASSWORD")
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt)
}

// Função para comparar a senha

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    console.log("COMPARE_PASSWORD")
    return await bcrypt.compare(password, hashedPassword);
}

// Função para gerar um token JWT

export const generateToken = (userId: number, email: string): string => {
    console.log("GENERATE_PASSWORD")
    return jwt.sign({id: userId, email:email}, JWT_SECRET, {expiresIn:'1h'});
}

// Função para verificar um token JWT 

export const verifyToken = (token: string): any => {
    console.log("VERIFY_PASSWORD: "+JWT_SECRET)
    console.log("V: "+token)
    const verificado = jwt.verify(token, JWT_SECRET)
    console.log("verificado: "+verificado)
    return verificado;
}
