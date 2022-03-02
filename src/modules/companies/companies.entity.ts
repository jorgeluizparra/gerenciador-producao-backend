import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductCategoriesEntity } from '../product_categories/product.categories.entity';
import { UsersEntity } from '../users/users.entity';

@Entity('companies')
export class CompaniesEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  cnpj: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  state: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => ProductCategoriesEntity, productCategory => productCategory.company)
  productCategories: ProductCategoriesEntity[];

  @OneToMany(() => UsersEntity, user => user.company)
  users: UsersEntity[];
}