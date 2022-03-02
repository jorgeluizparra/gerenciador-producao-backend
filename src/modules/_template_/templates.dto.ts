import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";
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

export class UpdateTemplateDto extends PartialType(
    OmitType(CreateTemplateDto, [] as const),
) {}
