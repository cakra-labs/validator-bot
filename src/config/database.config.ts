import { DataSourceOptions } from 'typeorm';

export const getDatabaseConfig = (): DataSourceOptions => {
  return {
    type: 'sqlite',
    database: 'db.sqlite',
    entities: ['dist/**/*.entity{ .ts,.js}'],
    synchronize: true,
    logging: true,
  };
};