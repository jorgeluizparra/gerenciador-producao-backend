import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { CreditCardsEntity } from '../credit_cards/credit.cards.entity';

@Entity('clients')
export class ClientsEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ select: false })
  password: string;

  @ApiProperty()
  @Column({ unique: true })
  cpf: string;

  @ApiProperty()
  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => CreditCardsEntity, creditCard => creditCard.client)
  creditCards?: CreditCardsEntity[];

}