import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { OpeningHoursController } from './opening.hours.controller';
import { OpeningHoursEntity } from './opening.hours.entity';
import { OpeningHoursService } from './opening.hours.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OpeningHoursEntity]),
    RestaurantsModule
  ],
  controllers: [OpeningHoursController],
  providers: [OpeningHoursService],
  exports: [OpeningHoursService]
})
export class OpeningHoursModule {}
