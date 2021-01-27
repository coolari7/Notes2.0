/* eslint-disable import/prefer-default-export */
import { DatabaseConfig } from "../../shared";

export const production: DatabaseConfig = {
  hostnames: "prod-hostname",
  databaseName: "prod-DBName",
  port: 27017,
  replicasetName: "prod-RPLSTName",
};
