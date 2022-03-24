import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { StationsEntity } from '../stations/stations.entity';

@Entity('times')
export class TimesEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  partNumber: string;

  @ApiProperty()
  @Column({ nullable: false })
  time: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", select: false })
  createdAt: Date;

  @ManyToOne(() => StationsEntity, station => station.times)
  station?: StationsEntity;
  @Column({ nullable: false })
  stationId: number;

}