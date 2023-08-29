
// export const jwtConstants = {
//     secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
// };
// export const tokenDuration = '120s'
// export const mysqlUsername = 'nestTestUser'
// export const mysqlPassword = 'nestTestUser123'
// export const mysqlDatabase = 'beautyx'
// export const mysqlPort = 3306

export enum RoleEnum {
  Customer = 'customer',
  Employee = 'employee',
  Manager = 'manager'
}
export enum SalonTypeEnum {
  Spa = 'spa',
  Barber = 'barber',
  HairStyling = 'hair styling',
  Manicure = 'manicure',
  Pedicure = 'pedicure',
}

export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHERS = 'others'
}
export enum ApprovalStatusEnum {
  APPROVED = 'approved',
  DENIED = 'denied',
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}
