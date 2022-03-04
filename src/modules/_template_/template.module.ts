import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from '../companies/companies.module';
import { TemplatesController } from './template.controller';
import { TemplatesEntity } from './template.entity';
import { TemplatesService } from './template.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TemplatesEntity]),
    CompaniesModule
  ],
  controllers: [TemplatesController],
  providers: [TemplatesService],
  exports: [TemplatesService]
})
export class TemplatesModule {}
