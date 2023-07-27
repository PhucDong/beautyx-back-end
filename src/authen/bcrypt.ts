import * as bcrypt from 'bcrypt';

export function passwordToHash (rawPassword: string){

    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, salt)

}
export function comparePasswordAndHash (rawPassword: string, hash: string){
    return bcrypt.compareSync(rawPassword, hash)

}