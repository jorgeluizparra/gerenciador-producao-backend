import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCreditCardDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    number: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    expirationDate: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ownerName: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ownerCpf: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ownerBirthDate: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    clientId: number;
}

export class UpdateCreditCardDto extends PartialType(
    OmitType(CreateCreditCardDto, [] as const),
) {}
