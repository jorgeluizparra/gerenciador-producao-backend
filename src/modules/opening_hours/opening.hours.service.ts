import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { CreateOpeningHourDto, FindAllOpeningHoursQueryDto, UpdateOpeningHourDto } from './opening.hours.dto';
import { OpeningHoursEntity } from './opening.hours.entity';

@Injectable()
export class OpeningHoursService {
  private readonly logger = new Logger(OpeningHoursService.name);
  
  constructor(
    @InjectRepository(OpeningHoursEntity)
    private openingHoursRepository: Repository<OpeningHoursEntity>,
    private restaurantService: RestaurantsService,
  ) {}

  async create (body: CreateOpeningHourDto): Promise<OpeningHoursEntity> {
    let openingHours = await this.findAll({ restaurantId: body.restaurantId, day: body.day })
    if (openingHours.length > 0) {
      this.logger.warn("Opening hour already exist")
      throw new HttpException(
        { message: `${body.day} já foi cadastrada(o).` },
        HttpStatus.BAD_REQUEST
      )
    }
    let openingHour = this.openingHoursRepository.create(body);
    openingHour.restaurant = await this.restaurantService.findOne(body.restaurantId, ['openingHours']);
    return this.openingHoursRepository.save(openingHour).catch((error) => {
      this.logger.error({
        location: '[OpeningHours > create]',
        error
      })
      throw new HttpException(
        { message: "Erro interno do servidor" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query: FindAllOpeningHoursQueryDto|FindAllOpeningHoursQueryDto[]): Promise<OpeningHoursEntity[]> {
    return this.openingHoursRepository.find({ where: query}).catch((error) => {
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

  async findOne(id: number, relations: string[]): Promise<OpeningHoursEntity> {
    let openingHour = await this.openingHoursRepository.findOne(id, { relations }).catch((error) => {
      this.logger.error({
        location: '[Product Categories > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!openingHour) {
      this.logger.warn("Opening hour id not found")
      throw new HttpException(
        { message: "Id não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
    return openingHour;
  }

  async updateOne(id: number, body: UpdateOpeningHourDto): Promise<OpeningHoursEntity> {
    await this.findOne(id, []);
    await this.openingHoursRepository.update({ id }, body).catch(error => {
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
    await this.openingHoursRepository.delete(id).catch((error) => {
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
