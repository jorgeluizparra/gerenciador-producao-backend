import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCreditCardDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    clientId: number;
}

export class UpdateCreditCardDto extends PartialType(
    OmitType(CreateCreditCardDto, [] as const),
) {}
