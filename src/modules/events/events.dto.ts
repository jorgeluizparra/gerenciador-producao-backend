import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from "class-validator";


export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    location: string;

    @Matches(
        /^([0-9]{4}(-[0-9]{2}){2} [0-9]{2}:[0-9]{2})$/, 
        { message: "Formato inválido. YYYY-MM-DD HH:MM" }
    )
    @IsNotEmpty()
    @ApiProperty()
    startsAt: Date;

    @Matches(
        /^([0-9]{4}(-[0-9]{2}){2} [0-9]{2}:[0-9]{2})$/, 
        { message: "Formato inválido. YYYY-MM-DD HH:MM" }
    )
    @IsNotEmpty()
    @ApiProperty()
    endsAt: Date;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional()
    isActive: boolean;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    companyId: number;
}

export class UpdateEventDto extends PartialType(
    OmitType(CreateEventDto, ['companyId'] as const),
) {}
