import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StationsService } from '../stations/stations.service';
import { CreateTimeDto, FindAllTimesQueryDto } from './times.dto';
import { TimesEntity } from './times.entity';

@Injectable()
export class TimesService {
  private readonly logger = new Logger(TimesService.name);
  
  constructor(
    @InjectRepository(TimesEntity)
    private timesRepository: Repository<TimesEntity>,
    private stationsService: StationsService
  ) {}

  async create (body: CreateTimeDto): Promise<TimesEntity> {
    let station = await this.stationsService.findOne(body.stationId, [])
    if (!station) {
      this.logger.error({
        location: '[Times > create]',
        error: "Estação não encontrada."
      })
      throw new HttpException(
        { message: "Estação não encontrada." },
        HttpStatus.BAD_REQUEST
      )
    }
    let time = this.timesRepository.create({
      partNumber: body.partNumber,
      time: body.time,
      station: station
    })
    return this.timesRepository.save(time).catch((error) => {
      this.logger.error({
        location: '[Times > create]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  findAll(query: FindAllTimesQueryDto|FindAllTimesQueryDto[]): Promise<TimesEntity[]> {
    return this.timesRepository.find({
      where: query
    }).catch((error) => {
      this.logger.error({
        location: '[Times > findAll]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
  }

  async findOne(id: number, relations: string[]): Promise<TimesEntity> {
    let time = await this.timesRepository.findOne(id, { relations }).catch((error) => {
      this.logger.error({
        location: '[Times > findOne]',
        error
      })
      throw new HttpException(
        { message: "Erro ao consultar o banco de dados" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    if (!time) {
      this.logger.warn("Time's id not found.")
      throw new HttpException(
        { message: "Empresa não encontrada" },
        HttpStatus.NOT_FOUND
      )
    }
    return time;
  }

}
