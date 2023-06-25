import bcrypt from 'bcrypt';

async function hashPass(password: string) {
    const SALT = 10;
    return await bcrypt.hash(password, SALT);
}

export default hashPass;
