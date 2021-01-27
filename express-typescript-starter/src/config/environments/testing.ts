/* eslint-disable import/prefer-default-export */
import { DatabaseConfig } from "../../shared";

export const testing: DatabaseConfig = {
  hostnames: "test-hostname",
  databaseName: "test-DBName",
  port: 27017,
  replicasetName: "test-RPLSTName",
};
