import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '../events/events.module';
import { EventTicketGroupsController } from './event.ticket.groups.controller';
import { EventTicketGroupsEntity } from './event.ticket.groups.entity';
import { EventTicketGroupsService } from './event.ticket.groups.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventTicketGroupsEntity]),
    EventsModule
  ],
  controllers: [EventTicketGroupsController],
  providers: [EventTicketGroupsService],
  exports: [EventTicketGroupsService]
})
export class EventTicketGroupsModule {}
