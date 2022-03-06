import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from '../companies/companies.module';
import { ProductCategoriesModule } from '../product_categories/product.categories.module';
import { ProductsController } from './products.controller';
import { ProductsEntity } from './products.entity';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity]),
    CompaniesModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
