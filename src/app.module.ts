import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from './modules/companies/companies.module'
import { ProductCategoriesModule } from './modules/product_categories/product.categories.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { ClientsModule } from './modules/clients/clients.module';
import { CreditCardsModule } from './modules/credit_cards/credit.cards.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
      }),
      envFilePath: [
        `./envs/.${process.env.NODE_ENV}.env`,
        './envs/.env'
      ],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT) || 3306,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV == "production" ? false : true,
        migrations: ["migration/*.js"],
        cli: {
          migrationsDir: "migration"
        }
      })
    }),
    CompaniesModule,
    ProductCategoriesModule,
    ProductsModule,
    UsersModule,
    ClientsModule,
    CreditCardsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
