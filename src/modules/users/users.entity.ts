import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CompaniesEntity } from '../companies/companies.entity';

@Entity('users')
export class UsersEntity {
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
  @Column()
  accessType: string;

  @ApiProperty()
  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => CompaniesEntity, company => company.users)
  company?: CompaniesEntity;
  @Column()
  companyId: number;
}