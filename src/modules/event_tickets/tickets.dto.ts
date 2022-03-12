import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TicketsEntity } from "./tickets.entity";

export class CreateTicketGroupDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    clientId: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    groupId: number;
}

export class UpdateTicketGroupDto extends PartialType(
    PickType(CreateTicketGroupDto, ['clientId'] as const),
) {}

export class FindAllTicketsQueryDto extends PartialType(TicketsEntity){}