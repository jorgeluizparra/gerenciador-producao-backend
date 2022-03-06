import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CompaniesEntity } from '../companies/companies.entity';

@Entity('events')
export class EventsEntity {
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
  @CreateDateColumn({ type: "datetime", select: false })
  startsAt: Date;

  @ApiProperty()
  @CreateDateColumn({ type: "datetime", select: false })
  endsAt: Date;

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

  @ManyToOne(() => CompaniesEntity, company => company.events)
  company?: CompaniesEntity;
  @Column({ nullable: false })
  companyId: number;

}