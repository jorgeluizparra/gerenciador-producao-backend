import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesService } from '../companies/companies.service';
import { CreateRestaurantDto, UpdateRestaurantDto } from './restaurants.dto';
import { RestaurantsEntity } from './restaurants.entity';

@Injectable()
export class RestaurantsService {
  private readonly logger = new Logger(RestaurantsService.name);
  
  constructor(
    @InjectRepository(RestaurantsEntity)
    private restaurantsRepository: Repository<RestaurantsEntity>,
    private companiesService: CompaniesService,
  ) {}

  async create (body: CreateRestaurantDto): Promise<RestaurantsEntity> {
    let restaurant = this.restaurantsRepository.create(body)
    restaurant.company = await this.companiesService.findOne(body.companyId, ['restaurants']);
    return this.restaurantsRepository.save(restaurant).catch((error) => {
      this.logger.error({
        location: '[Restaurants > create]',
        error
      })
      throw new HttpException(
        { message: "Erro interno do servidor" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query): Promise<RestaurantsEntity[]> {
    return this.restaurantsRepository.find({ where: query }).catch((error) => {
      this.logger.error({
        location: '[Restaurants > findAll]',
        error
      })
      throw new HttpException(
        { message: "Aconteceu algum erro ao tentar consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  async findOne(id: number, relations: string[]): Promise<RestaurantsEntity> {
    let restaurant = await this.restaurantsRepository.findOne(id, { relations }).catch((error) => {
      this.logger.error({
        location: '[Restaurant > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!restaurant) {
      this.logger.warn("Restaurant id not found")
      throw new HttpException(
        { message: "Id não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
    return restaurant;
  }

  async updateOne(id: number, body: UpdateRestaurantDto): Promise<RestaurantsEntity> {
    await this.findOne(id, []);
    await this.restaurantsRepository.update({ id }, body).catch((error) => {
      this.logger.error({
        location: '[Restaurant > updateOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    return this.findOne(id, []);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id, [])
    await this.restaurantsRepository.delete(id).catch((error) => {
      this.logger.error({
        location: '[Restaurant > remove]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

}
