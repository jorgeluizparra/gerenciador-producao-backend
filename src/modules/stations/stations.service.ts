import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStationDto, FindAllStationsQueryDto } from './stations.dto';
import { StationsEntity } from './stations.entity';

@Injectable()
export class StationsService {
  private readonly logger = new Logger(StationsService.name);
  
  constructor(
    @InjectRepository(StationsEntity)
    private stationsRepository: Repository<StationsEntity>
  ) {}

  async create (body: CreateStationDto): Promise<StationsEntity> {
    let station = this.stationsRepository.create(body)
    return this.stationsRepository.save(station).catch((error) => {
      this.logger.error({
        location: '[Stations > create]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query: FindAllStationsQueryDto|FindAllStationsQueryDto[]): Promise<StationsEntity[]> {
    return this.stationsRepository.find({
      where: query
    }).catch((error) => {
      this.logger.error({
        location: '[Stations > findAll]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  async findOne(id: number, relations: string[]): Promise<StationsEntity> {
    let station = await this.stationsRepository.findOne(id, { relations }).catch((error) => {
      this.logger.error({
        location: '[Stations > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!station) {
      this.logger.warn("Station's id not found.")
      throw new HttpException(
        { message: "Empresa não encontrada" },
        HttpStatus.NOT_FOUND
      )
    }
    return station;
  }

}
