import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CompaniesEntity } from '../companies/companies.entity';
import { ProductsEntity } from '../products/products.entity';

@Entity('product_categories')
export class ProductCategoriesEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  isActive: boolean;

  @ManyToOne(() => CompaniesEntity, company => company.productCategories)
  company: CompaniesEntity;

  @OneToMany(() => ProductsEntity, product => product.productCategory)
  products: ProductsEntity[];
}