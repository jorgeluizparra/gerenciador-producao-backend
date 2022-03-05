import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config({ path: `./envs/.${process.env.NODE_ENV}.env` })

const ormConfig: TypeOrmModuleOptions = {
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
};

export default ormConfig;