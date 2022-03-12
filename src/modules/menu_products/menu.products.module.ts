import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { MenuProductsController } from './menu.products.controller';
import { MenuProductsEntity } from './menu.products.entity';
import { MenuProductsService } from './menu.products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuProductsEntity]),
    RestaurantsModule
  ],
  controllers: [MenuProductsController],
  providers: [MenuProductsService],
  exports: [MenuProductsService]
})
export class MenuProductsModule {}
