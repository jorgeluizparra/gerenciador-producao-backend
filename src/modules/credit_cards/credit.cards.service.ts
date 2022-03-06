import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';
import { CreateCreditCardDto, UpdateCreditCardDto } from './credit.cards.dto';
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
    let client = await this.clientsService.findOne(body.clientId, ['creditCards']);
    creditCard.client = client
    return this.creditCardsRepository.save(creditCard).catch((error) => {
      this.logger.error({
        location: '[Credit Cards > create]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query: object): Promise<CreditCardsEntity[]> {
    return this.creditCardsRepository.find({ where: query}).catch((error) => {
      this.logger.error({
        location: '[Credit cards > findAll]',
        error
      })
      throw new HttpException(
        { message: "Aconteceu algum erro ao tentar consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  async findOne(id: number, relations: string[]): Promise<CreditCardsEntity> {
    let creditCard = await this.creditCardsRepository.findOne(id, { relations }).catch((error) => {
      this.logger.error({
        location: '[Creadit Cards > findOne]',
        error
      })
      throw new HttpException(
        { message: "Aconteceu algum erro ao tentar consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!creditCard) {
      this.logger.warn("Credit card id not found")
      throw new HttpException(
        { message: "Cartão de credito não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
    return creditCard;
  }

  async updateOne(id: number, body: UpdateCreditCardDto): Promise<CreditCardsEntity> {
    await this.findOne(id, []);
    await this.creditCardsRepository.update({ id }, body).catch(error => {
      this.logger.error({
        location: '[Credit cards > updateOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    return this.findOne(id, []);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id, [])
    await this.creditCardsRepository.delete(id).catch((error) => {
      this.logger.error({
        location: '[Creadit Cards > remove]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

}
