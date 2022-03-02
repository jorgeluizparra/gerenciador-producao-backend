import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from '../clients/clients.module';
import { CreditCardsController } from './credit.cards.controller';
import { CreditCardsEntity } from './credit.cards.entity';
import { CreditCardsService } from './credit.cards.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CreditCardsEntity]),
    ClientsModule
  ],
  controllers: [CreditCardsController],
  providers: [CreditCardsService],
  exports: [CreditCardsService]
})
export class CreditCardsModule {}
