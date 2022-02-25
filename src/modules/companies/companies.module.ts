import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SintegraModule } from '../sintegra/sintegra.module';
import { CompaniesController } from './companies.controller';
import { CompaniesEntity } from './companies.entity';
import { CompaniesService } from './companies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompaniesEntity]),
    SintegraModule
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService]
})
export class CompaniesModule {}
