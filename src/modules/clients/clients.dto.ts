import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length, IsEmail } from "class-validator";

export class CreateClientDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    cpf: string;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional()
    isActive?: boolean;
}

export class UpdateClientDto extends PartialType(
    OmitType(CreateClientDto, ['email', 'cpf'] as const),
) {}