import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateClientDto } from '../src/modules/clients/clients.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('create', async () => {
    let payload: CreateClientDto = {
      email: 'teste@teste.com',
      password: 'teste123',
      cpf: '12312312312'
    }

    let {status, body} = await request(app.getHttpServer())
    .post('/clients')
    .send(payload)

    expect(status).toBe(201)
    expect(Object.keys(body)).toBe(["id", "email"])
    expect(body).toContainEqual({
      id: expect.any(Number),
      name: expect.any(String)
    })
  });

  afterAll(async () => {
    await app.close()
  })

});

