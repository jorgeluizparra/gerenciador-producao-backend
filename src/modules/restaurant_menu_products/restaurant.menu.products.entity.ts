import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { ProductsEntity } from '../products/products.entity';
import { RestaurantsEntity } from '../restaurants/restaurants.entity';

@Entity('menu_products')
export class RestaurantMenusProductsEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  price: number;

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

  @ManyToOne(() => RestaurantsEntity, restaurant => restaurant.restaurantMenusProducts)
  restaurant?: RestaurantsEntity;
  @Column({ nullable: false })
  restaurantId: number;
  
  @OneToOne(() => ProductsEntity, { eager: true })
  @JoinColumn()
  product?: ProductsEntity;
  @Column({ nullable: false })
  productId: number;
}