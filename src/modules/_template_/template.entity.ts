import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CompaniesEntity } from '../companies/companies.entity';
import { ProductsEntity } from '../products/products.entity';

@Entity('templates')
export class TemplatesEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => CompaniesEntity, company => company.productCategories)
  company: CompaniesEntity;
  @Column()
  companyId: number;

  // @OneToMany(() => ProductsEntity, product => product.productCategory)
  // products: ProductsEntity[];
}