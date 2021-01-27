/* eslint-disable import/prefer-default-export */
import * as configs from "./environments";
import deploymentEnv from "./getNodeEnv";

const config = configs[deploymentEnv];

export { config };
