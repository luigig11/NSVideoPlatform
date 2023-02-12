import bcrypt from "bcrypt";

async function encrypt(plainText: string): Promise<string> {
    const SALT_ROUNDS = 10;
    const hashedPass = await bcrypt.hash(plainText, SALT_ROUNDS);
    return hashedPass;
}

async function decrypt(plainText: string, comparedText: string) {
    const isSamePass = await bcrypt.compare(plainText, comparedText);
    return isSamePass;
}


export {
    encrypt,
    decrypt
}