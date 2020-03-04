const process = require('process');

function TypeOrmConfig() {
  const {
    POSTGRES_HOST: host,
    POSTGRES_PORT: port,
    POSTGRES_DB: database,
    POSTGRES_USER: username,
    POSTGRES_PASSWORD: password,
  } = process.env;

  const migrationsDir = '/db/migrations';

  return {
    type: 'postgres',
    host,
    port,
    database,
    username,
    password,
    entities: [__dirname + '/**/*.entity.ts'],
    migrations: [migrationsDir + '/**/*.ts'],
    synchronize: true,
    dropSchema: false,
    logging: true,
    migrationsTableName: 'migrations',
    cli: {
      migrationsDir,
      entitiesDir: 'src',
    },
  }
}

module.exports = TypeOrmConfig();
