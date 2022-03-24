import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { TimesEntity } from "./times.entity";

export class CreateTimeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    partNumber: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    time: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    stationId: number;
}

export class FindAllTimesQueryDto extends PartialType(TimesEntity){}
