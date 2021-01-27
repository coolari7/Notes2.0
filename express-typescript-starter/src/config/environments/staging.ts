/* eslint-disable import/prefer-default-export */
import { DatabaseConfig } from "../../shared";

export const staging: DatabaseConfig = {
  hostnames: "stage-hostname",
  databaseName: "stage-DBName",
  port: 27017,
  replicasetName: "stage-RPLSTName",
};
