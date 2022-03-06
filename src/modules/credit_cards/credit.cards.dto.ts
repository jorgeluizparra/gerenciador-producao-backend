import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches } from "class-validator";

export class CreateCreditCardDto {
    
    @Length(16)
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    number: string;

    @Length(3)
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    securityCode: string;
  
    @Matches(
        /^([0-9]{4}-[0-9]{2})$/, 
        { message: "Formato inválido. YYYY-MM" }
    )
    @IsNotEmpty()
    @ApiProperty()
    expirationDate: Date;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ownerName: string;
    
    @Length(11)
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    ownerCpf: string;
  
    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ format: "date" })
    ownerBirthDate: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    clientId: number;
}

export class UpdateCreditCardDto extends PartialType(
    OmitType(CreateCreditCardDto, [] as const),
) {}
