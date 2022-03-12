import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CompaniesEntity } from '../companies/companies.entity';
import { RestaurantMenusProductsEntity } from '../restaurant_menu_products/restaurant.menu.products.entity';
import { OpeningDaysEntity } from '../opening_days/opening.days.entity';

@Entity('restaurants')
export class RestaurantsEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: false })
  description: string;

  @ApiProperty()
  @Column({ nullable: false })
  location: string;

  @ApiProperty()
  @Column({ default: true, nullable: false })
  isActive: boolean;

  @ApiProperty()
  @Column({ default: false, nullable: false })
  createdBy: string;

  @ApiProperty()
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", select: false })
  createdAt: Date;
  
  @ApiProperty()
  @Column({ default: false, nullable: false })
  updatedBy: string;

  @ApiProperty()
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @ManyToOne(() => CompaniesEntity, company => company.restaurants)
  company?: CompaniesEntity;
  @Column({ nullable: false })
  companyId: number;

  @OneToMany(() => OpeningDaysEntity, openingDay => openingDay.restaurant)
  openingDays?: OpeningDaysEntity[];

  @OneToMany(() => RestaurantMenusProductsEntity, menuProduct => menuProduct.restaurant)
  restaurantMenusProducts?: RestaurantMenusProductsEntity[];
}