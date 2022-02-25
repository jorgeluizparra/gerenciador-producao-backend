import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateCompanyDto {
    
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

export class UpdateCompanyDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    name: string;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional()
    isActive: boolean;
}