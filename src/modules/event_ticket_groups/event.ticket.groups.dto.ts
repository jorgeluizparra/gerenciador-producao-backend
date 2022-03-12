import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { EventTicketGroupsEntity } from "./event.ticket.groups.entity";

export class CreateEventTicketGroupDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    productId: number;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    eventId: number;
}

export class UpdateEventTicketGroupDto extends PartialType(
    PickType(CreateEventTicketGroupDto, ['price', 'quantity'] as const),
) {}

export class FindAllEventTicketGroupsQueryDto extends PartialType(EventTicketGroupsEntity){}