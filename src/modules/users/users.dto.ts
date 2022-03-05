import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsEmail, ValidateIf } from "class-validator";
import { AccessType } from "./users.entity";

const AcceptedAccountTypes: AccessType[] = ['admin', 'normal']

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional()
    isActive: boolean;

    @IsString()
    @ValidateIf(value => AcceptedAccountTypes.includes(value.toLowerCase()))
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
    OmitType(CreateUserDto, ['email'] as const),
) {}