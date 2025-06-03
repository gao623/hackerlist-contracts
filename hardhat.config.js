require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      evmVersion: "london",
      optimizer: {
        enabled: true,
        runs: 0
      }
    }
  },
  networks: {
    localTest: {
      url: "http://127.0.0.1:8545/",
      accounts: [process.env.PK],
    },
    wanchainMainnet: {
      url: "https://gwan-ssl.wandevs.org:56891/",
      accounts: [process.env.PK],
      gasPrice: 1e9,
      minGasPrice: 1e9,
      gas: 8e6,
      maxPriorityFeePerGas: 1e9,
    },
    wanchainTestnet: {
      url: "https://gwan-ssl.wandevs.org:46891/",
      accounts: [process.env.PK],
      gasPrice: 10e9,
      minGasPrice: 10e9,
      gas: 8e6,
      maxPriorityFeePerGas: 1e9,
      HackerlistAddress: '0x17aE30b8F0B22d9BBed70996ee6C4409A15AB28D',
    },
    sepolia: {
      url: "https://eth-sepolia.api.onfinality.io/public",
      accounts: [process.env.PK],
      HackerlistAddress: '0xc43143f1f3B7b9ae3D67Ddf3E634cce3f7d45427',
      gas: 8e6,
    },
  }
};
