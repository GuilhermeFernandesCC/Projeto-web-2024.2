import { generateToken } from "./utils/auth";
function teste() {
    console.log(generateToken(1, "teste@email.com"));
}

export default teste;