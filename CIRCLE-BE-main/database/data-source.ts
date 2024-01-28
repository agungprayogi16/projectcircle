/** @format */

import "reflect-metadata";
import { DataSource } from "typeorm";
import Env from "../src/utils/variables/Env";
import { User } from "./entities/User";
import { Thread } from "./entities/Thread";
import { Reply } from "./entities/Reply";
import { Like } from "./entities/Like";
import { Upload } from "./entities/Upload";
import { MigrationFile1703817233286 } from "./migration/1703817233286-MigrationFile";

export const PostgreDataSource = new DataSource({
  type: "postgres",
  host: Env.DB_HOST,
  port: Env.DB_PORT,
  username: Env.DB_USERNAME,
  password: "agung12154",
  database: Env.DB_NAME,
  entities: [User, Thread, Reply, Like, Upload],
  migrations: [MigrationFile1703817233286],

  subscribers: [],
});
