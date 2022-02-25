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

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
    }),
    ConfigModule.forRoot({
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
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV == "development" ? true : false,
      })
    }),
    CompaniesModule,
    ProductCategoriesModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
