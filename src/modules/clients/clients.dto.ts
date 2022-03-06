import { ApiProperty, ApiPropertyOptional, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length, IsEmail, MinLength, Matches } from "class-validator";
import { ClientsEntity } from "./clients.entity";

export class CreateClientDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ format: "email" })
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
}

export class UpdateClientDto extends PartialType(
    PickType(CreateClientDto, ['password'] as const),
) {}

export class UpdateClientPasswordDto extends PickType(CreateClientDto, ['password'] as const) {}

export class FindAllClientsQueryDto extends PartialType(ClientsEntity){}
