import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Timestamp } from 'typeorm';
import { ClientsEntity } from '../clients/clients.entity';

@Entity('credit_cards')
export class CreditCardsEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  number: string;

  @Column({ type: "date", select: false, nullable: false })
  expirationDate: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", select: false })
  createdAt: Date;

  @ManyToOne(() => ClientsEntity, client => client.creditCards)
  client?: ClientsEntity;
  @Column({ nullable: false })
  clientId: number;
}