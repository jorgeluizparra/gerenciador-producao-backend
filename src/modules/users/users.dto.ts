import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsEmail, Matches, Length, Validate } from "class-validator";
import { ValidateAccountType } from "../../../src/utils/custom.validators";
import { AccessType } from "./users.entity";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8)
    @Matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})./,
        { message: 'Sua senha deve conter pelomenos 1 caracter maiúsculo, 1 minúsculo, 1 número e 1 caracter especial.' }
    )
    @ApiProperty()
    password: string;

    // @IsString()
    // @MinLength(8)
    // @Matches('password')
    // @ApiProperty()
    // passwordConfirm: string;

    @IsString()
    @Validate(ValidateAccountType)
    @Transform(({ value }) => value.toLowerCase())
    @IsNotEmpty()
    @ApiProperty()
    accessType: AccessType;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    companyId: number;
}

export class UpdateUserDto extends PartialType(
    PickType(CreateUserDto, ['accessType', 'password'] as const),
) {}

export class UpdateUserAccountTypeDto extends PickType(CreateUserDto, ['accessType'] as const) {}

export class UpdateUserPasswordDto extends PickType(CreateUserDto, ['password'] as const) {}