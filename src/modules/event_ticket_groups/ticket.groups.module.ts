import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '../events/events.module';
import { TicketGroupsController } from './ticket.groups.controller';
import { TicketGroupsEntity } from './ticket.groups.entity';
import { TicketGroupsService } from './ticket.groups.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketGroupsEntity]),
    EventsModule
  ],
  controllers: [TicketGroupsController],
  providers: [TicketGroupsService],
  exports: [TicketGroupsService]
})
export class TicketGroupsModule {}
