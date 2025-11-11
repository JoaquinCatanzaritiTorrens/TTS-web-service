import fs from "fs";
import path from "path";
import { QueryRunner } from "typeorm";

const executeSql = async (queryRunner: QueryRunner, file: string) => {
  const migrationsDir = path.join(__dirname, "../../../migrations");
  const fullPath = path.resolve(migrationsDir, file);
  const sqlQuery = fs.readFileSync(fullPath, "utf8");
  return await queryRunner.query(sqlQuery);
};

export default executeSql;
