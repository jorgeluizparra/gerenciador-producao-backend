import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketGroupsModule } from '../event_ticket_groups/ticket.groups.module';
import { TicketsController } from './tickets.controller';
import { TicketsEntity } from './tickets.entity';
import { TicketsService } from './tickets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketsEntity]),
    TicketGroupsModule
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService]
})
export class TicketsModule {}
