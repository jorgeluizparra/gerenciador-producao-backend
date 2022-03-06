import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductCategoriesEntity } from "./product.categories.entity";

export class CreateProductCategoryDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    companyId: number;
}

export class UpdateProductCategoryDto extends PartialType(
    OmitType(CreateProductCategoryDto, ['companyId'] as const),
) {}

export class FindAllProductCategoriesQueryDto extends PartialType(ProductCategoriesEntity){}
