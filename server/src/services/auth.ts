const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthService {

async generateUserToken(user): Promise<string> {
    const token = await jwt.sign(user, process.env.SECRET);
    return token;
}

async verifyToken(token: string, user): Promise<boolean> {
    try {
        const res = await jwt.verify(token, process.env.SECRET);
        return res == user;
    } catch (e) {
        return false;
    }
}

async checkUserPassword(cmp: {pass1:string, pass2:string}): Promise<Boolean> {
    return cmp.pass1 === cmp.pass2;
}

}

export default new AuthService();