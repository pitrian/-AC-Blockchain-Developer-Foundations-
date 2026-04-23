import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("====================");
  console.log("Network:", hre.network.name);
  console.log("Deployer:", deployer);
  console.log("====================");

  console.log("Deploying MyNFT Contract...");

  await deploy("MyNFT", {
    contract: "MyNFT",
    args: [],
    from: deployer,
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: false,
  });
};

func.tags = ["deploy"];
export default func;