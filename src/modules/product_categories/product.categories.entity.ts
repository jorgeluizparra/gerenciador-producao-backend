import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CompaniesEntity } from '../companies/companies.entity';

@Entity('product_categories')
export class ProductCategoriesEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ManyToOne(() => CompaniesEntity, company => company.productCategories)
  company: CompaniesEntity;

}