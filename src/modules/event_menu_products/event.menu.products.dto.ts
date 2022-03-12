import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { EventMenusProductsEntity } from "./event.menu.products.entity";

export class CreateEventMenusProductDto {

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
    eventId: number;
}

export class UpdateEventMenusProductDto extends PartialType(
    PickType(CreateEventMenusProductDto, [] as const),
) {}

export class FindAllEventMenusProductsQueryDto extends PartialType(EventMenusProductsEntity){}