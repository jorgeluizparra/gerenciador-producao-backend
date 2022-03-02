import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategoriesService } from '../product_categories/product.categories.service';
import { SintegraService } from '../sintegra/sintegra.service';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { ProductsEntity } from './products.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  
  constructor(
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
    private productsCategorie: ProductCategoriesService
  ) {}

  async create (body: CreateProductDto): Promise<ProductsEntity> {
    let product = this.productsRepository.create(body)
    let productCategory = await this.productsCategorie.findOne(body.productCategoryId);
    product.productCategory = productCategory
    return this.productsRepository.save(product).catch((error) => {
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

  findAll(query): Promise<ProductsEntity[]> {
    return this.productsRepository.find({ where: query }).catch((error) => {
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
    let product = await this.findOne(id);
    let productCategory = await this.productsCategorie.findOne(body.productCategoryId);
    product.productCategory = productCategory;
    await this.productsRepository.update({ id }, body);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }

}
