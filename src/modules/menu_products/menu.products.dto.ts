import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Matches, Validate } from "class-validator";
import { MenuProductsEntity } from "./menu.products.entity";

export class CreateMenuProductDto {

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

export class UpdateMenuProductDto extends PartialType(
    PickType(CreateMenuProductDto, [] as const),
) {}

export class FindAllMenuProductsQueryDto extends PartialType(MenuProductsEntity){}