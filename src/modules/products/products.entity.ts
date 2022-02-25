import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductCategoriesEntity } from '../product_categories/product.categories.entity';

@Entity('products')
export class ProductsEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @Column({ type: 'float' })
  price: number;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => ProductCategoriesEntity, productCategory => productCategory.products)
  productCategory: ProductCategoriesEntity;
  @Column()
  productCategoryId: number;

}