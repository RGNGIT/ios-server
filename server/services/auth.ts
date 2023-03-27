import jwt from 'jsonwebtoken';
require("dotenv").config();

class AuthService {
  async generateUserTokens(user: {
    UserKey: string | string[];
    Verify: string | string[];
  }): Promise<{ token: string; refreshToken: string; }> {
    const token = await jwt.sign(user, process.env.SECRET, { expiresIn: "1m" });
    const refreshToken = await jwt.sign(user, process.env.REFRESH_SECRET);
    return { token, refreshToken };
  }
  async verifyRefreshToken(token: string): Promise<any> {
    try {
      return await jwt.verify(token, process.env.REFRESH_SECRET);
    } catch (e) {
      return false;
    }
  }
  async verifyToken(
    token: string,
    user: {
      UserData: {
        UserKey: string | string[];
        Verify: string | string[];
      };
      Token: string | string[];
    }
  ): Promise<boolean> {
    try {
      const res = await jwt.verify(token, process.env.SECRET);
      return (
        res.UserKey == user.UserData.UserKey &&
        res.Verify == user.UserData.Verify
      );
    } catch (e) {
      return false;
    }
  }
  async checkUserPassword(cmp: {
    pass1: string;
    pass2: string;
  }): Promise<Boolean> {
    return cmp.pass1 === cmp.pass2;
  }
}

export default new AuthService();
