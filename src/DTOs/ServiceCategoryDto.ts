import { IsNotEmpty } from "class-validator";

export class createServiceCategoryDto {
    @IsNotEmpty()
    serviceCategoryName: string

}
export class updateServiceCategoryDto {
    
    serviceCategoryName: string

}