import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateTemplateDto {
    
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

export class UpdateTemplateDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    name: string;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional()
    isActive: boolean;
}