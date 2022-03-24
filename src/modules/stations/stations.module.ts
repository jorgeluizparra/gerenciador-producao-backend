import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsController } from './stations.controller';
import { StationsEntity } from './stations.entity';
import { StationsService } from './stations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StationsEntity])
  ],
  controllers: [StationsController],
  providers: [StationsService],
  exports: [StationsService]
})
export class StationsModule {}
