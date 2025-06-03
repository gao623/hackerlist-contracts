// scripts/deploy.js

const hre = require("hardhat");
const sdnlist = require('./sdnlist.json');
const {HackerlistAddress, gas, txMaxSize} = hre.network.config;

console.log("network:", hre.network, "HackerlistAddress:", HackerlistAddress);

function hexWith0x(hexStr) {
    if (0 > hexStr.indexOf('0x')) {
        return `0x${hexStr}`;
    }
    return hexStr;
}

function hexStrip0x(str) {
  if(0 > str.indexOf('0x')){
      return str;
  }
  return str.slice(2);
}

async function getMaxGasLimit() {
  // const provider = new ethers.JsonRpcProvider(rpc)
  // const block = await provider.getBlock(await provider.getBlockNumber());

  const block = await hre.ethers.provider.getBlock(await hre.ethers.provider.getBlockNumber());
  console.log("block:", block);
  const chainGasLimit = block.gasLimit * 80n /100n;

  let configGasLimit = 0n;
  try {
    configGasLimit = BigInt(gas);
  } catch (e) {
    console.error("Ignore invalid gas limit in config:", gas, "Error:", e);
  }

  const maxGasLimit = chainGasLimit > configGasLimit && configGasLimit > 0n ? configGasLimit : chainGasLimit;
  console.log("maxGasLimit:", maxGasLimit);
  return maxGasLimit;
}

function chunkArray(arr, chunkSize) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
}

// hre.network.name
async function main() {
  const [signer] = await ethers.getSigners();
  console.log("signer:", signer)

  const contract = await ethers.getContractAt("Hackerlist", HackerlistAddress, signer);
  console.log("contract:", contract)
  // [[account, isHacked, issuerCode]]
  const data = sdnlist.reduce((reduced, address) => {
    if (ethers.isAddress(address)) {
      reduced.push([address, true, 0]);
    } else {
      var buffer = Buffer.from(address, 'hex');
      if (buffer.length > 0) {
        reduced.push([hexWith0x(buffer.toString("hex")), true, 0]);
      }
      var buffer = Buffer.from(address);
      if (buffer.length > 0) {
        reduced.push([hexWith0x(buffer.toString("hex")), true, 0]);
      }
    }
    return reduced;
  }, []);
  console.log("converted sdnlist:", JSON.stringify(data));

  console.log("contract.setHackers:", contract.setHackers);
  // let tx = await contract.setHackers(data);
  // console.log("set hackers tx:", tx, tx.toJSON());
  const estimateGas = await contract.setHackers.estimateGas(data);
  console.log("estimateGas:", estimateGas)

  const maxGasLimit = await getMaxGasLimit();
  console.log("maxGasLimit:", maxGasLimit)

  let n = estimateGas / maxGasLimit;
  if (n == 0n || estimateGas > maxGasLimit * n) {
    n += 1n;
  }
  console.log("n:", n);

  let chunkSize = parseInt(data.length / Number(n));
  if (chunkSize * Number(n) < data.length) {
    chunkSize += 1;
  }
  console.log("chunkSize:", chunkSize);

  const dataArray = chunkArray(data, Number(chunkSize));
  console.log("dataArray:", JSON.stringify(dataArray));

  for (let i = 0; i < dataArray.length; ++i) {
    const tx = await contract.setHackers(dataArray[i]);
    const receipt = await tx.wait();
    console.log("set hackers", i, "success, receipt:", receipt);

    // console.log("set hackers", i, "success");
  }

  console.log("Hackerlist set successfully!");
}

// 处理可能的错误
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
