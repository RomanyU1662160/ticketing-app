import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const asyncScrypt = promisify(scrypt);


export class Password {
    static async hash(pass: string) {
        const salt = randomBytes(8).toString('hex')
        const buffer = (await asyncScrypt(pass, salt, 64) as Buffer).toString('hex');
        const hashed = buffer + '.' + salt;

        return hashed

    };


    static async compare(hashed: string, password: string) {
        const [buf, salt] = hashed.split('.');
        const bufOFSubmittedPassword = (await asyncScrypt(password, salt, 64) as Buffer).toString('hex');
        return bufOFSubmittedPassword === buf;

    }


}
