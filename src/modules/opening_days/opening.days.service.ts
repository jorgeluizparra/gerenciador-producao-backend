import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { CreateOpeningDayDto, FindAllOpeningDaysQueryDto, UpdateOpeningDayDto } from './opening.days.dto';
import { OpeningDaysEntity } from './opening.days.entity';

@Injectable()
export class OpeningDaysService {
  private readonly logger = new Logger(OpeningDaysService.name);
  
  constructor(
    @InjectRepository(OpeningDaysEntity)
    private openingDaysRepository: Repository<OpeningDaysEntity>,
    private restaurantService: RestaurantsService,
  ) {}

  async create (body: CreateOpeningDayDto): Promise<OpeningDaysEntity> {
    let openingDays = await this.findAll({ restaurantId: body.restaurantId, day: body.day })
    if (openingDays.length > 0) {
      this.logger.warn("Opening hour already exist")
      throw new HttpException(
        { message: `${body.day} já foi cadastrada(o).` },
        HttpStatus.BAD_REQUEST
      )
    }
    let openingDay = this.openingDaysRepository.create(body);
    openingDay.restaurant = await this.restaurantService.findOne(body.restaurantId, ['openingDays']);
    return this.openingDaysRepository.save(openingDay).catch((error) => {
      this.logger.error({
        location: '[OpeningDays > create]',
        error
      })
      throw new HttpException(
        { message: "Erro interno do servidor" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query: FindAllOpeningDaysQueryDto|FindAllOpeningDaysQueryDto[]): Promise<OpeningDaysEntity[]> {
    return this.openingDaysRepository.find({ where: query}).catch((error) => {
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

  async findOne(id: number, relations: string[]): Promise<OpeningDaysEntity> {
    let openingDay = await this.openingDaysRepository.findOne(id, { relations }).catch((error) => {
      this.logger.error({
        location: '[Product Categories > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!openingDay) {
      this.logger.warn("Opening hour id not found")
      throw new HttpException(
        { message: "Id não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
    return openingDay;
  }

  async updateOne(id: number, body: UpdateOpeningDayDto): Promise<OpeningDaysEntity> {
    await this.findOne(id, []);
    await this.openingDaysRepository.update({ id }, body).catch(error => {
      this.logger.error({
        location: '[Product Catergories > updateOne]',
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
    await this.openingDaysRepository.delete(id).catch((error) => {
      this.logger.error({
        location: '[Product Categories > remove]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

}
