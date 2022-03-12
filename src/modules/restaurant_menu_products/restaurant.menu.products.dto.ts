import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Matches, Validate } from "class-validator";
import { RestaurantMenusProductsEntity } from "./restaurant.menu.products.entity";

export class CreateRestaurantMenusProductDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    productId: number;
    

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    restaurantId: number;
}

export class UpdateRestaurantMenusProductDto extends PartialType(
    PickType(CreateRestaurantMenusProductDto, ['price'] as const),
) {}

export class FindAllRestaurantMenusProductsQueryDto extends PartialType(RestaurantMenusProductsEntity){}