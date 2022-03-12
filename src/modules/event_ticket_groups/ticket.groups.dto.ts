import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TicketGroupsEntity } from "./ticket.groups.entity";

export class CreateTicketGroupDto {

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

export class UpdateTicketGroupDto extends PartialType(
    PickType(CreateTicketGroupDto, ['price', 'quantity'] as const),
) {}

export class FindAllTicketGroupsQueryDto extends PartialType(TicketGroupsEntity){}