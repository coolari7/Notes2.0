/* eslint-disable import/prefer-default-export */
import { DatabaseConfig } from "../../shared";

export const development: DatabaseConfig = {
  hostnames: "dev-hostname",
  databaseName: "dev-DBName",
  port: 27017,
  replicasetName: "dev-RPLSTName",
};
