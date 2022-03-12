import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { EventsEntity } from '../events/events.entity';
import { TicketGroupsEntity } from '../event_ticket_groups/ticket.groups.entity';
import { ProductsEntity } from '../products/products.entity';

@Entity('event_tickets')
export class TicketsEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => TicketGroupsEntity, group => group.tickets)
  group?: TicketGroupsEntity;
  @Column({ nullable: false })
  groupId: number;

}