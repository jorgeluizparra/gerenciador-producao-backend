import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { StationsEntity } from "./stations.entity";

export class CreateStationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    stationNumber: string;
}

export class FindAllStationsQueryDto extends PartialType(StationsEntity){}
