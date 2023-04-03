import sha256 from "crypto-js/sha256";
import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

class EncryptService {
  async encrypt(pass: string): Promise<string> {
    const hash = sha256(pass);
    return Base64.stringify(hmacSHA512(hash, process.env.HASH_KEY));
  }
}

export default new EncryptService();