import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Matches, Validate } from "class-validator";
import { DaysFormatTypes, ValidateDayFormat } from "src/utils/custom.validators";
import { DaysFormat, OpeningDaysEntity } from "./opening.days.entity";

export class CreateOpeningDayDto {
    
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

export class UpdateOpeningDayDto extends PartialType(
    PickType(CreateOpeningDayDto, ['openTime', 'closeTime'] as const),
) {}

export class FindAllOpeningDaysQueryDto extends PartialType(OpeningDaysEntity){}