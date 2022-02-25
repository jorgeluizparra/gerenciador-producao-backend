import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SintegraService } from '../sintegra/sintegra.service';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { ProductsEntity } from './products.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  
  constructor(
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
  ) {}

  async create (body: CreateProductDto): Promise<ProductsEntity> {
    let template = this.productsRepository.create(body)
    return this.productsRepository.save(template).catch((error) => {
      this.logger.error({
        location: '[Products > create]',
        error
      })
      throw new HttpException(
        { message: "Erro interno do servidor" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(): Promise<ProductsEntity[]> {
    return this.productsRepository.find().catch((error) => {
      this.logger.error({
        location: '[Products > findAll]',
        error
      })
      throw new HttpException(
        { message: "Aconteceu algum erro ao tentar consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findOne(id: number): Promise<ProductsEntity> {
    try {
      return this.productsRepository.findOne(id);
    } catch (error) {
      throw new HttpException(
        { message: "Id não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
  }

  async updateOne(id: number, body: UpdateProductDto): Promise<ProductsEntity> {
    await this.findOne(id);
    await this.productsRepository.update({ id }, body);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }

}
