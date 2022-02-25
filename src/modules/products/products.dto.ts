import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateProductDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @Length(14)
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    cnpj: string;
}

export class UpdateProductDto {
    
    @IsString()
    @ApiProperty()
    name: string;

    @IsBoolean()
    @ApiProperty()
    isActive: boolean;
}