import { DEPLOYMENT_ENVIRONMENT } from "../shared";

function getNodeEnv(): DEPLOYMENT_ENVIRONMENT | "defaults" {
  let deploymentEnv = process.env.NODE_ENV;

  if (deploymentEnv !== undefined) {
    deploymentEnv = deploymentEnv.toLowerCase();
    if (/dev/i.test(deploymentEnv)) {
      deploymentEnv = "development";
    } else if (/test/i.test(deploymentEnv)) {
      deploymentEnv = "testing";
    } else if (/stag/i.test(deploymentEnv)) {
      deploymentEnv = "staging";
    } else if (/prod/i.test(deploymentEnv)) {
      deploymentEnv = "production";
    } else {
      deploymentEnv = "defaults";
    }
  } else {
    deploymentEnv = "defaults";
  }

  return deploymentEnv as DEPLOYMENT_ENVIRONMENT | "defaults";
}

const deploymentEnv = getNodeEnv();
export default deploymentEnv;
