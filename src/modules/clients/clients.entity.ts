import { ApiProperty } from '@nestjs/swagger';
import { boolean } from 'joi';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CreditCardsEntity } from '../credit_cards/credit.cards.entity';

@Entity('clients')
export class ClientsEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ select: false, nullable: false })
  password: string;

  @Column({ unique: true, select: false, nullable: false })
  cpf: string;

  @Column({ default: false, select: false, nullable: false })
  isActive: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", select: false })
  createdAt: Date;

  @OneToMany(() => CreditCardsEntity, creditCard => creditCard.client)
  creditCards?: CreditCardsEntity[];

}