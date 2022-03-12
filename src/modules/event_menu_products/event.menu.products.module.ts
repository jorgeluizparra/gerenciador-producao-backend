import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from '../events/events.module';
import { EventMenusProductsController } from './event.menu.products.controller';
import { EventMenusProductsEntity } from './event.menu.products.entity';
import { EventMenusProductsService } from './event.menu.products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventMenusProductsEntity]),
    EventsModule
  ],
  controllers: [EventMenusProductsController],
  providers: [EventMenusProductsService],
  exports: [EventMenusProductsService]
})
export class EventMenusProductsModule {}
