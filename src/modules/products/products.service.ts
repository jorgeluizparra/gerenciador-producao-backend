import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesService } from '../companies/companies.service';
import { ProductCategoriesService } from '../product_categories/product.categories.service';
import { SintegraService } from '../sintegra/sintegra.service';
import { CreateProductDto, FindAllProductsQueryDto, UpdateProductDto } from './products.dto';
import { ProductsEntity } from './products.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  
  constructor(
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
    private companiesService: CompaniesService,
  ) {}

  async create (body: CreateProductDto): Promise<ProductsEntity> {
    let product = this.productsRepository.create(body)
    product.company = await this.companiesService.findOne(body.companyId, ['products']);
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

  findAll(query: FindAllProductsQueryDto|FindAllProductsQueryDto[]): Promise<ProductsEntity[]> {
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

  async findOne(id: number, relations: string[]): Promise<ProductsEntity> {
    let product = await this.productsRepository.findOne(id, { relations }).catch((error) => {
      this.logger.error({
        location: '[Product > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!product) {
      this.logger.warn("Product id not found")
      throw new HttpException(
        { message: "Id não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
    return product;
  }

  async updateOne(id: number, body: UpdateProductDto): Promise<ProductsEntity> {
    await this.findOne(id, []);
    await this.productsRepository.update({ id }, body).catch((error) => {
      this.logger.error({
        location: '[Product > updateOne]',
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
    await this.productsRepository.delete(id).catch((error) => {
      this.logger.error({
        location: '[Product > remove]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

}
