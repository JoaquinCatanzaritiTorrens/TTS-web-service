import { QueryRunner } from "typeorm";
import executeSql from './executeSql';

export const createQueryFileExecutor = (queryRunner: QueryRunner) => {
  return async (file: string): Promise<void> => {
    return await executeSql(queryRunner, file);
  };
};
