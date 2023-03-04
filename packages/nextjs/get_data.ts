import { ethers } from "ethers";
async function main() {
  const provider = new ethers.providers.JsonRpcProvider({ url: "https://alpha-rpc.scroll.io/l2" }, 534353);
  const results = await provider.getTransaction("0x156dbe3a4aba19bbac43173901a5cd3cfe1a1d064735e65eb23e1916a3b33a4e");
  console.log(results);
}

main();
