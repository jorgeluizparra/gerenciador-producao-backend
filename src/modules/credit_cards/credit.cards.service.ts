import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';
import { CreateCreditCardDto } from './credit.cards.dto';
import { CreditCardsEntity } from './credit.cards.entity';

@Injectable()
export class CreditCardsService {
  private readonly logger = new Logger(CreditCardsService.name);
  
  constructor(
    @InjectRepository(CreditCardsEntity)
    private creditCardsRepository: Repository<CreditCardsEntity>,
    private clientsService: ClientsService,
  ) {}

  async create (body: CreateCreditCardDto): Promise<CreditCardsEntity> {
    let creditCard = this.creditCardsRepository.create(body);
    let client = await this.clientsService.findOne(body.clientId);
    creditCard.client = client
    return this.creditCardsRepository.save(creditCard).catch((error) => {
      this.logger.error({
        location: '[CreditCards > create]',
        error
      })
      throw new HttpException(
        { message: "Erro interno do servidor" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query): Promise<CreditCardsEntity[]> {
    return this.creditCardsRepository.find({ where: query}).catch((error) => {
      this.logger.error({
        location: '[Product Categories > findAll]',
        error
      })
      throw new HttpException(
        { message: "Aconteceu algum erro ao tentar consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  async findOne(id: number): Promise<CreditCardsEntity> {
    let creditCard;
    try {
      creditCard = await this.creditCardsRepository.findOne(id, { relations: ['products'] });
    } catch (error) {
      this.logger.error({
        location: '[Product Categories > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
    if (!creditCard) {
      this.logger.warn("Product category id not found")
      throw new HttpException(
        { message: "Categoria não encontrada" },
        HttpStatus.NOT_FOUND
      )
    }
    return creditCard;
  }

  async remove(id: string): Promise<void> {
    await this.creditCardsRepository.delete(id);
  }

}
