import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateClientDto } from '../src/modules/clients/clients.dto';
import { getConnection } from 'typeorm';
import { ClientsEntity } from '../src/modules/clients/clients.entity';

describe('[Clients]', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  // const connection = getConnection();
  // const clientRepository = connection.getRepository(ClientsEntity)

  it('create', async () => {
    let payload: CreateClientDto = {
      email: 'teste@teste.com',
      password: 'teste123',
      cpf: '12312312312'
    }

    let {status} = await request(app.getHttpServer())
    .post('/clients')
    .send(payload)

    expect(status).toBe(201)
  });

  it('findAll', async () => {

    let {status, body} = await request(app.getHttpServer())
    .get('/clients')

    expect(status).toBe(200)
    expect(Array.isArray(body)).toBe(true)
    expect(Object.keys(body[0])).toBe(["id", "email"])
    expect(body[0]).toContainEqual({
      id: expect.any(Number),
      name: expect.any(String)
    })
  });

  afterAll(async () => {
    await app.close()
  })

});

