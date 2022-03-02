import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional()
    isActive: boolean;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    productCategoryId: number;
}

export class UpdateProductDto extends PartialType(
    OmitType(CreateProductDto, [] as const),
) {}
