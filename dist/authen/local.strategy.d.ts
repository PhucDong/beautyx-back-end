import { Strategy } from 'passport-local';
import { AuthenService } from './authen.service';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authenService;
    constructor(authenService: AuthenService);
    validate(email: string, password: string): Promise<import("../TypeOrms/ManagerEntity").ManagerEntity | CustomerEntity>;
}
export {};
