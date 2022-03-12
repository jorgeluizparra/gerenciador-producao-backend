import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { CreateMenuProductDto, FindAllMenuProductsQueryDto, UpdateMenuProductDto } from './menu.products.dto';
import { MenuProductsEntity } from './menu.products.entity';

@Injectable()
export class MenuProductsService {
  private readonly logger = new Logger(MenuProductsService.name);
  
  constructor(
    @InjectRepository(MenuProductsEntity)
    private menuProductsRepository: Repository<MenuProductsEntity>,
    private restaurantService: RestaurantsService,
  ) {}

  async create (body: CreateMenuProductDto): Promise<MenuProductsEntity> {
    let menuProducts = await this.findAll({ restaurantId: body.restaurantId })
    if (menuProducts.length > 0) {
      this.logger.warn("Opening hour already exist")
      throw new HttpException(
        { message: `Já foi cadastrada(o).` },
        HttpStatus.BAD_REQUEST
      )
    }
    let openingDay = this.menuProductsRepository.create(body);
    openingDay.restaurant = await this.restaurantService.findOne(body.restaurantId, ['menuProducts']);
    return this.menuProductsRepository.save(openingDay).catch((error) => {
      this.logger.error({
        location: '[MenuProducts > create]',
        error
      })
      throw new HttpException(
        { message: "Erro interno do servidor" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query: FindAllMenuProductsQueryDto|FindAllMenuProductsQueryDto[]): Promise<MenuProductsEntity[]> {
    return this.menuProductsRepository.find({ where: query}).catch((error) => {
      this.logger.error({
        location: '[Opening Days > findAll]',
        error
      })
      throw new HttpException(
        { message: "Aconteceu algum erro ao tentar consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  async findOne(id: number, relations: string[]): Promise<MenuProductsEntity> {
    let openingDay = await this.menuProductsRepository.findOne(id, { relations }).catch((error) => {
      this.logger.error({
        location: '[Opening Days > findOne]',
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

  async updateOne(id: number, body: UpdateMenuProductDto): Promise<MenuProductsEntity> {
    await this.findOne(id, []);
    await this.menuProductsRepository.update({ id }, body).catch(error => {
      this.logger.error({
        location: '[Opening Days > updateOne]',
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
    await this.menuProductsRepository.delete(id).catch((error) => {
      this.logger.error({
        location: '[Opening Days > remove]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

}
