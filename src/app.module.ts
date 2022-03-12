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
import { TypeOrmConfigService } from './database';
import { EventsModule } from './modules/events/events.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { OpeningDaysModule } from './modules/restaurant_opening_days/opening.days.module';
import { RestaurantMenusProductsModule } from './modules/restaurant_menu_products/restaurant.menu.products.module';
import { EventMenusProductsModule } from './modules/event_menu_products/event.menu.products.module';
import { TicketGroupsModule } from './modules/event_ticket_groups/ticket.groups.module';
import { TicketsModule } from './modules/event_tickets/tickets.module';

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
      useClass: TypeOrmConfigService,
    }),
    CompaniesModule,
    UsersModule,
    EventsModule,
    TicketGroupsModule,
    TicketsModule,
    EventMenusProductsModule,
    RestaurantsModule,
    RestaurantMenusProductsModule,
    OpeningDaysModule,
    ProductCategoriesModule,
    ProductsModule,
    ClientsModule,
    CreditCardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
