import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length, IsEmail, MinLength, Matches } from "class-validator";

export class CreateClientDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Senha muito fraca.'})
    @ApiProperty()
    password: string;

    // @IsString()
    // @MinLength(8)
    // @Matches('password')
    // @ApiProperty()
    // passwordConfirm: string;

    @Length(11)
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
    PickType(CreateClientDto, ['password', 'isActive'] as const),
) {}

export class UpdateClientPasswordDto extends PickType(CreateClientDto, ['password'] as const) {}

export class EnableAccountDto extends PickType(CreateClientDto, ['isActive'] as const) {}
