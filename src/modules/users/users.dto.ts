import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsEmail,ValidatorConstraint, ValidatorConstraintInterface, Matches, Length, Validate } from "class-validator";
import { AccessType } from "./users.entity";

const AcceptedAccountTypes: AccessType[] = ['admin', 'normal']

@ValidatorConstraint({ name: 'accountType', async: false })
export class ValidateAccountType implements ValidatorConstraintInterface {
  validate(accountType) {
    return AcceptedAccountTypes.includes(accountType.toLowerCase()) ? true : false
  }

  defaultMessage() {
    return "Permissão inválida.";
  }
}

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8)
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})./, { message: 'Senha muito fraca.' })
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