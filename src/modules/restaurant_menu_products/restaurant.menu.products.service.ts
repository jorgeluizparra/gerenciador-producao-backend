import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { CreateRestaurantMenusProductDto, FindAllRestaurantMenusProductsQueryDto, UpdateRestaurantMenusProductDto } from './restaurant.menu.products.dto';
import { RestaurantMenusProductsEntity } from './restaurant.menu.products.entity';

@Injectable()
export class RestaurantMenusProductsService {
  private readonly logger = new Logger(RestaurantMenusProductsService.name);
  
  constructor(
    @InjectRepository(RestaurantMenusProductsEntity)
    private restaurantMenusProductsRepository: Repository<RestaurantMenusProductsEntity>,
    private restaurantService: RestaurantsService,
  ) {}

  async create (body: CreateRestaurantMenusProductDto): Promise<RestaurantMenusProductsEntity> {
    let restaurantMenusProducts = await this.findAll({ restaurantId: body.restaurantId, productId: body.productId })
    if (restaurantMenusProducts.length > 0) {
      this.logger.warn("Menu Product already exist")
      throw new HttpException(
        { message: `Produto já cadastrada(o) neste menu.` },
        HttpStatus.BAD_REQUEST
      )
    }
    let openingDay = this.restaurantMenusProductsRepository.create(body);
    openingDay.restaurant = await this.restaurantService.findOne(body.restaurantId, ['restaurantMenusProducts']);
    return this.restaurantMenusProductsRepository.save(openingDay).catch((error) => {
      this.logger.error({
        location: '[RestaurantMenusProducts > create]',
        error
      })
      throw new HttpException(
        { message: "Erro interno do servidor" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query: FindAllRestaurantMenusProductsQueryDto|FindAllRestaurantMenusProductsQueryDto[]): Promise<RestaurantMenusProductsEntity[]> {
    return this.restaurantMenusProductsRepository.find({ where: query}).catch((error) => {
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

  async findOne(id: number, relations: string[]): Promise<RestaurantMenusProductsEntity> {
    let openingDay = await this.restaurantMenusProductsRepository.findOne(id, { relations }).catch((error) => {
      this.logger.error({
        location: '[Menu Products > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!openingDay) {
      this.logger.warn("Menu Product id not found")
      throw new HttpException(
        { message: "Id não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
    return openingDay;
  }

  async updateOne(id: number, body: UpdateRestaurantMenusProductDto): Promise<RestaurantMenusProductsEntity> {
    await this.findOne(id, []);
    await this.restaurantMenusProductsRepository.update({ id }, body).catch(error => {
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
    await this.restaurantMenusProductsRepository.delete(id).catch((error) => {
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
