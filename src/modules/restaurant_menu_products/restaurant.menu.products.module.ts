import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { RestaurantMenusProductsController } from './restaurant.menu.products.controller';
import { RestaurantMenusProductsEntity } from './restaurant.menu.products.entity';
import { RestaurantMenusProductsService } from './restaurant.menu.products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RestaurantMenusProductsEntity]),
    RestaurantsModule
  ],
  controllers: [RestaurantMenusProductsController],
  providers: [RestaurantMenusProductsService],
  exports: [RestaurantMenusProductsService]
})
export class RestaurantMenusProductsModule {}
