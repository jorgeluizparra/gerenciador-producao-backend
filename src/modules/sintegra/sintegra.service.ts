import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SintegraService {
  private readonly logger = new Logger(SintegraService.name);

  constructor(
    private httpService: HttpService
  ) {}
  
  private async getDataFromSintegraApi(params: ParamsDto): Promise<any> {
    let { data } = await this.httpService.get(
      process.env.API_SINTEGRA,
      {
        params: {
          token: process.env.SINTEGRA_TOKEN,
          ...params
        }
      }
    )
    .toPromise()
    .catch((error) => {
      this.logger.error(error)
      throw new HttpException(
        { message: "Ocoreu um erro ao tentar consultar os dados na Receita Federal" },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    });
    return data;
  }

  async findOneCnpj(cnpj: string): Promise<any> {
    if (cnpj.length != 14) {
      throw new HttpException(
        { message: "CNPJ deve conter 14 numeros." },
        HttpStatus.BAD_REQUEST
      )
    }
    
    let params: CnpjParamsDto = {
      cnpj,
      plugin: "RF"
    }
    return this.getDataFromSintegraApi(params);
  }

  async findOneCpf(cpf: string, birthDate: string): Promise<any> {
    if (cpf.length != 11) {
      throw new HttpException(
        { message: "CNPJ deve conter 11 numeros." },
        HttpStatus.BAD_REQUEST
      )
    }

    let params: CpfParamsDto = {
      cpf,
      "data-nascimento": birthDate,
      plugin: "CPF"
    }
    return this.getDataFromSintegraApi(params);
  }

}
