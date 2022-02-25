import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompaniesService } from '../companies/companies.service';
import { CreateProductCategorieDto } from './product.categories.dto';
import { ProductCategoriesEntity } from './product.categories.entity';

@Injectable()
export class ProductCategoriesService {
  private readonly logger = new Logger(ProductCategoriesService.name);
  
  constructor(
    @InjectRepository(ProductCategoriesEntity)
    private productCategoriesRepository: Repository<ProductCategoriesEntity>,
    private companiesService: CompaniesService,
  ) {}

  async create (body: CreateProductCategorieDto): Promise<ProductCategoriesEntity> {
    let productCategorie = this.productCategoriesRepository.create(body);
    let company = await this.companiesService.findOne(body.companyId);
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

  findAll(companyId): Promise<ProductCategoriesEntity[]> {
    let query
    if (companyId) query = { where: { company: parseInt(companyId) }};
    return this.productCategoriesRepository.find(query).catch((error) => {
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

  findOne(id: number): Promise<ProductCategoriesEntity> {
    try {
      return this.productCategoriesRepository.findOne(id);
    } catch (error) {
      throw new HttpException(
        { message: "Id não encontrado" },
        HttpStatus.NOT_FOUND
      )
    }
  }

  async remove(id: string): Promise<void> {
    await this.productCategoriesRepository.delete(id);
  }

}
