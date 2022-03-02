import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";
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

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional()
    isActive: boolean;
}

export class UpdateCompanyDto extends PartialType(
    OmitType(CreateCompanyDto, [] as const),
) {}
