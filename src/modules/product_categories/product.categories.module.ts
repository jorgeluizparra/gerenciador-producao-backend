import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from '../companies/companies.module';
import { ProductCategoriesController } from './product.categories.controller';
import { ProductCategoriesEntity } from './product.categories.entity';
import { ProductCategoriesService } from './product.categories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCategoriesEntity]),
    CompaniesModule
  ],
  controllers: [ProductCategoriesController],
  providers: [ProductCategoriesService],
  exports: [ProductCategoriesService]
})
export class ProductCategoriesModule {}
