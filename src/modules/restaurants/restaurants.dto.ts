import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from "class-validator";
import { RestaurantsEntity } from "./restaurants.entity";


export class CreateRestaurantDto {
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

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional()
    isActive: boolean;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    companyId: number;
}

export class UpdateRestaurantDto extends PartialType(
    OmitType(CreateRestaurantDto, ['companyId'] as const),
) {}

export class FindAllRestaurantsQueryDto extends PartialType(RestaurantsEntity){}
