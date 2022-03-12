import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { EventsEntity } from '../events/events.entity';
import { ProductsEntity } from '../products/products.entity';

@Entity('event_ticket_groups')
export class EventTicketGroupsEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @ApiProperty()
  @Column({ nullable: false })
  price: number;

  @ApiProperty()
  @Column({ nullable: false })
  quantity: number;

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

  @ManyToOne(() => EventsEntity, event => event.eventTicketGroups)
  event?: EventsEntity;
  @Column({ nullable: false })
  eventId: number;

}