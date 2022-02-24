module.exports = {
    "type": "mysql",
    "host": process.env.DATABASE_HOST,
    "port": process.env.DATABASE_PORT,
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "entities": ["dist/modules/**/*.entity{.ts,.js}"],
    "synchronize": process.env.NODE_ENV == "development" ? true : false,
    "migrations": ["migrations/**/*{.ts,.js}"],
    "cli": {
        "migrationsDir": "migration",
    },
}
