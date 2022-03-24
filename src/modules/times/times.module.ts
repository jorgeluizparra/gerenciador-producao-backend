import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsModule } from '../stations/stations.module';
import { TimesController } from './times.controller';
import { TimesEntity } from './times.entity';
import { TimesService } from './times.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimesEntity]),
    StationsModule
  ],
  controllers: [TimesController],
  providers: [TimesService],
  exports: [TimesService]
})
export class TimesModule {}
