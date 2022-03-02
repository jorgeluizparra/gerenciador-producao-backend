import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ClientsEntity } from '../clients/clients.entity';
import { CompaniesEntity } from '../companies/companies.entity';
import { ProductsEntity } from '../products/products.entity';

@Entity('credit_cards')
export class CreditCardsEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => ClientsEntity, client => client.creditCards)
  client: ClientsEntity;
  @Column()
  clientId: number;
}