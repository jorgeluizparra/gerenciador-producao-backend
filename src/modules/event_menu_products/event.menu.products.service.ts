import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsService } from '../events/events.service';
import { CreateEventMenusProductDto, FindAllEventMenusProductsQueryDto, UpdateEventMenusProductDto } from './event.menu.products.dto';
import { EventMenusProductsEntity } from './event.menu.products.entity';

@Injectable()
export class EventMenusProductsService {
  private readonly logger = new Logger(EventMenusProductsService.name);
  
  constructor(
    @InjectRepository(EventMenusProductsEntity)
    private eventMenusProductsRepository: Repository<EventMenusProductsEntity>,
    private eventService: EventsService,
  ) {}

  async create (body: CreateEventMenusProductDto): Promise<EventMenusProductsEntity> {
    let eventMenusProducts = await this.findAll({ eventId: body.eventId, productId: body.productId })
    if (eventMenusProducts.length > 0) {
      this.logger.warn("Menu Product already exist")
      throw new HttpException(
        { message: `Produto já cadastrada(o) neste menu.` },
        HttpStatus.BAD_REQUEST
      )
    }
    let eventMenusProduct = this.eventMenusProductsRepository.create(body);
    eventMenusProduct.event = await this.eventService.findOne(body.eventId, ['eventMenusProducts']);
    return this.eventMenusProductsRepository.save(eventMenusProduct).catch((error) => {
      this.logger.error({
        location: '[EventMenusProducts > create]',
        error
      })
      throw new HttpException(
        { message: "Erro interno do servidor" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query: FindAllEventMenusProductsQueryDto|FindAllEventMenusProductsQueryDto[]): Promise<EventMenusProductsEntity[]> {
    return this.eventMenusProductsRepository.find({ where: query}).catch((error) => {
      this.logger.error({
        location: '[Menu Products > findAll]',
        error
      })
      throw new HttpException(
        { message: "Aconteceu algum erro ao tentar consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  async findOne(id: number, relations: string[]): Promise<EventMenusProductsEntity> {
    let eventMenusProduct = await this.eventMenusProductsRepository.findOne(id, { relations }).catch((error) => {
      this.logger.error({
        location: '[Menu Products > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!eventMenusProduct) {
      this.logger.warn("Menu Product id not found")
      throw new HttpException(
        { message: "Id não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
    return eventMenusProduct;
  }

  async updateOne(id: number, body: UpdateEventMenusProductDto): Promise<EventMenusProductsEntity> {
    await this.findOne(id, []);
    await this.eventMenusProductsRepository.update({ id }, body).catch(error => {
      this.logger.error({
        location: '[Menu Products > updateOne]',
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
    await this.eventMenusProductsRepository.delete(id).catch((error) => {
      this.logger.error({
        location: '[Menu Products > remove]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

}
