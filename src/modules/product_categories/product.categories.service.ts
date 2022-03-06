import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesService } from '../companies/companies.service';
import { CreateProductCategoryDto, FindAllProductCategoriesQueryDto, UpdateProductCategoryDto } from './product.categories.dto';
import { ProductCategoriesEntity } from './product.categories.entity';

@Injectable()
export class ProductCategoriesService {
  private readonly logger = new Logger(ProductCategoriesService.name);
  
  constructor(
    @InjectRepository(ProductCategoriesEntity)
    private productCategoriesRepository: Repository<ProductCategoriesEntity>,
    private companiesService: CompaniesService,
  ) {}

  async create (body: CreateProductCategoryDto): Promise<ProductCategoriesEntity> {
    let productCategorie = this.productCategoriesRepository.create(body);
    let company = await this.companiesService.findOne(body.companyId, ['productCategories']);
    productCategorie.company = company
    return this.productCategoriesRepository.save(productCategorie).catch((error) => {
      this.logger.error({
        location: '[ProductCategories > create]',
        error
      })
      throw new HttpException(
        { message: "Erro interno do servidor" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query: FindAllProductCategoriesQueryDto|FindAllProductCategoriesQueryDto[]): Promise<ProductCategoriesEntity[]> {
    return this.productCategoriesRepository.find({ where: query}).catch((error) => {
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

  async findOne(id: number, relations: string[]): Promise<ProductCategoriesEntity> {
    let productCategory = await this.productCategoriesRepository.findOne(id, { relations }).catch((error) => {
      this.logger.error({
        location: '[Product Categories > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao tentar consultar o banco de dados." },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!productCategory) {
      this.logger.warn("Product category id not found")
      throw new HttpException(
        { message: "Id não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
    return productCategory;
  }

  async updateOne(id: number, body: UpdateProductCategoryDto): Promise<ProductCategoriesEntity> {
    await this.findOne(id, []);
    await this.productCategoriesRepository.update({ id }, body).catch(error => {
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
    await this.productCategoriesRepository.delete(id).catch((error) => {
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
