import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateAndUpdateProductDto {
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
