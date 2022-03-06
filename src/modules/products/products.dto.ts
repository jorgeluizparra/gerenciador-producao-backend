import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { ProductsEntity } from "./products.entity";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional()
    isActive: boolean;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    productCategory: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    companyId: number;
}

export class UpdateProductDto extends PartialType(
    OmitType(CreateProductDto, ['companyId'] as const),
) {}

export class FindAllProductsQueryDto extends PartialType(ProductsEntity){}
