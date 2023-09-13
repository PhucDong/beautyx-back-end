import { AuthenService } from './authen.service';
import { registerDto } from 'src/DTOs/AuthenDto';
import { CustomerEntity } from 'src/TypeOrms/CustomerEntity';
import { CustomerService } from 'src/customer/customer.service';
export declare class AuthenController {
    private authenService;
    private readonly customerService;
    constructor(authenService: AuthenService, customerService: CustomerService);
    logIn(request: any): any;
    refresh(request: any): any;
    logOut(request: any): Promise<import("typeorm").UpdateResult>;
    register(newUser: registerDto): Promise<import("../TypeOrms/ManagerEntity").ManagerEntity | CustomerEntity>;
}
