import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CompaniesEntity } from '../companies/companies.entity';
import { ProductsEntity } from '../products/products.entity';

@Entity('product_categories')
export class ProductCategoriesEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => CompaniesEntity, company => company.productCategories)
  company?: CompaniesEntity;
  @Column({ nullable: false })
  companyId: number;
}