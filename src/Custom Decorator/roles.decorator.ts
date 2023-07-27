import { SetMetadata } from '@nestjs/common';
export enum RoleEnum {
    Customer = 'customer',
    Employee = 'employee',
    Manager = 'manager'
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);

  