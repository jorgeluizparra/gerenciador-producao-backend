import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SintegraService } from './sintegra.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [SintegraService],
  exports: [SintegraService]
})
export class SintegraModule {}
