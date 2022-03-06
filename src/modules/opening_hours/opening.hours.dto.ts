import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Matches, Validate } from "class-validator";
import { DaysFormatTypes, ValidateDayFormat } from "src/utils/custom.validators";
import { DaysFormat, OpeningHoursEntity } from "./opening.hours.entity";

export class CreateOpeningHourDto {
    
    @IsString()
    @Validate(ValidateDayFormat)
    @Transform(({ value }) => value.toLowerCase())
    @IsNotEmpty()
    @ApiProperty({ enum: DaysFormatTypes })
    day: DaysFormat;

    @Matches(
        /^([0-9]{2}:[0-9]{2})$/, 
        { message: "Formato inválido. HH:MM" }
    )
    @IsNotEmpty()
    @ApiProperty()
    openTime: string;

    @Matches(
        /^([0-9]{2}:[0-9]{2})$/, 
        { message: "Formato inválido. HH:MM" }
    )
    @IsNotEmpty()
    @ApiProperty()
    closeTime: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    restaurantId: number;
}

export class UpdateOpeningHourDto extends PartialType(
    OmitType(CreateOpeningHourDto, ['restaurantId'] as const),
) {}

export class FindAllOpeningHoursQueryDto extends PartialType(OpeningHoursEntity){}