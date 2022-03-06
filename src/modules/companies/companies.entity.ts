import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EventsEntity } from '../events/events.entity';
import { ProductsEntity } from '../products/products.entity';
import { ProductCategoriesEntity } from '../product_categories/product.categories.entity';
import { RestaurantsEntity } from '../restaurants/restaurants.entity';
import { UsersEntity } from '../users/users.entity';

@Entity('companies')
export class CompaniesEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, select: false, nullable: false })
  cnpj: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column({ nullable: false })
  email: string;

  @ApiProperty()
  @Column({ nullable: false })
  state: string;

  @ApiProperty()
  @Column({ nullable: false })
  city: string;

  @Column({ default: false, select: false, nullable: false })
  isActive: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", select: false })
  createdAt: Date;
  
  @ApiProperty()
  @Column({ default: false, nullable: false })
  updatedBy: string;

  @ApiProperty()
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @OneToMany(() => ProductCategoriesEntity, productCategory => productCategory.company)
  productCategories?: ProductCategoriesEntity[];

  @OneToMany(() => ProductsEntity, productCategory => productCategory.company)
  products?: ProductsEntity[];

  @OneToMany(() => EventsEntity, event => event.company)
  events?: EventsEntity[];
  
  @OneToMany(() => RestaurantsEntity, restaurant => restaurant.company)
  restaurants?: RestaurantsEntity[];

  @OneToMany(() => UsersEntity, user => user.company)
  users?: UsersEntity[];
}