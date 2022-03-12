import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { RestaurantsEntity } from '../restaurants/restaurants.entity';

export type DaysFormat = 
  'segunda-feira'|'terça-feira'|'quarta-feira'|'quinta-feira' 
  |'sexta-feira'|'sabado-feira'|'domingo-feira'|'feriados'


@Entity('opening_days')
export class OpeningDaysEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  day: DaysFormat;

  @ApiProperty()
  @Column({ nullable: false })
  openTime: string;

  @ApiProperty()
  @Column({ nullable: false })
  closeTime: string;

  @ManyToOne(() => RestaurantsEntity, restaurant => restaurant.openingDays)
  restaurant?: RestaurantsEntity;
  @Column({ nullable: false })
  restaurantId: number;
}