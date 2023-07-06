import { IsNotEmpty } from "class-validator";

export class createServiceCategoryDto {
    
    @IsNotEmpty()
    serviceCategoryName: string

}
export class updateServiceCategoryDto {

    @IsNotEmpty()
    serviceCategoryName: string

}