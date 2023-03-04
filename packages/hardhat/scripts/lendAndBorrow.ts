import * as dotenv from "dotenv";
dotenv.config();
import { ethers, ContractFactory, Wallet } from "ethers";
import QRCode from "qrcode";
import { config } from "hardhat";
import {abi} from '../deployments/goerli/YourContract.json';
import creditPoolAbi from '../deployments/goerli/BaseCreditPool.json';

async function main() {
  const privateKey = process.env.DEPLOYER_PRIVATE_KEY;

  if (!privateKey) {
    console.log("🚫️ You don't have a deployer account. Run `yarn generate` first");
    return;
  }
  console.log('adding provicder')
  const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/ugw2EcIzTw9sG99pp46rSa0NBZTHcwip", "goerli");
  console.log(provider)

  // Get account from private key.
  const wallet = new Wallet(privateKey, provider);
  const address = wallet.address;
  console.log(await QRCode.toString(address, { type: "terminal", small: true }));
  console.log("Public address:", address, "\n");


  console.log('adding contract')
  const contract = new ethers.Contract("0x6842393062367bbBeAa61185836D18d50a50A0bf", abi, provider).connect(wallet);

  console.log('adding owners')
  const receipt = await contract.addOwner(['0xd5e8b4c482e9900271cab47ec21f13e48fdc3c9b'])
  const tx = await receipt.wait();
  console.log(tx);

  // console.log('adding borrower')
  // const result = await contract.addWhitelistedBorrower('0x34e4eA84D3142DCB5caA70dF96C2742D6b4958cd');
  // console.log('result');
  // console.log(result);
  // const tx = await result.wait();
  // console.log(tx);

  const results = await contract.getWhitelistedBorrowers();
  console.log(results);


  // Balance on each network
  // const availableNetworks = config.networks;
  // for (const networkName in availableNetworks) {
  //   try {
  //     const network = availableNetworks[networkName];
  //     if (!("url" in network)) continue;
  //     const provider = new ethers.providers.JsonRpcProvider(network.url);
  //     const balance = await provider.getBalance(address);
  //     console.log("--", networkName, "-- 📡");
  //     console.log("   balance:", +ethers.utils.formatEther(balance));
  //     console.log("   nonce:", +(await provider.getTransactionCount(address)));
  //   } catch (e) {
  //     console.log("Can't connect to network", networkName);
  //   }
  // }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
