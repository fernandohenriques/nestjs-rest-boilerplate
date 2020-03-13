import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../../src/users/users.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  const {
    POSTGRES_HOST: host,
    POSTGRES_PORT: port,
    POSTGRES_DB: database,
    POSTGRES_USER: username,
    POSTGRES_PASSWORD: password,
  } = process.env;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host,
          port: parseInt(port),
          database,
          username,
          password,
          entities: [__dirname + '/src/**/*.entity.ts'],
          dropSchema: false,
          logging: true,
        }),
        UsersModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET) exists', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
