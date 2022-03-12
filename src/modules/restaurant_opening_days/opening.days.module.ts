import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { OpeningDaysController } from './opening.days.controller';
import { OpeningDaysEntity } from './opening.days.entity';
import { OpeningDaysService } from './opening.days.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OpeningDaysEntity]),
    RestaurantsModule
  ],
  controllers: [OpeningDaysController],
  providers: [OpeningDaysService],
  exports: [OpeningDaysService]
})
export class OpeningDaysModule {}
