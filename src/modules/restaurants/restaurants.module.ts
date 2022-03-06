import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from '../companies/companies.module';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsEntity } from './restaurants.entity';
import { RestaurantsService } from './restaurants.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RestaurantsEntity]),
    CompaniesModule
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
  exports: [RestaurantsService]
})
export class RestaurantsModule {}
