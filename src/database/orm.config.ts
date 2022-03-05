const dotenv = require('dotenv')
dotenv.config({ path: `./envs/.${process.env.NODE_ENV}.env` })

module.exports = {
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