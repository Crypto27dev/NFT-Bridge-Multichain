require("dotenv").config();
require('hardhat-contract-sizer');
require("@nomiclabs/hardhat-waffle");
require(`@nomiclabs/hardhat-etherscan`);
require("solidity-coverage");
require('hardhat-gas-reporter');
require('hardhat-deploy');
require('hardhat-deploy-ethers');
require('@openzeppelin/hardhat-upgrades');
require('./tasks');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

function getMnemonic(networkName) {
  if (networkName) {
    const mnemonic = process.env['MNEMONIC_' + networkName.toUpperCase()]
    if (mnemonic && mnemonic !== '') {
      return mnemonic
    }
  }

  const mnemonic = process.env.MNEMONIC
  if (!mnemonic || mnemonic === '') {
    return 'test test test test test test test test test test test junk'
  }

  return mnemonic
}

function accounts(chainKey) {
  return { mnemonic: getMnemonic(chainKey) }
}

function accounts2(chainKey) {
  return { privatekey: `${process.env.PRIVATE_KEY}` }
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {

  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]


  },

  // solidity: "0.8.4",
  contractSizer: {
    alphaSort: false,
    runOnCompile: true,
    disambiguatePaths: false,
  },

  namedAccounts: {
    deployer: {
      default: 0,    // wallet address 0, of the mnemonic in .env
    },
    proxyOwner: {
      default: 1,
    },
  },

  mocha: {
    timeout: 100000000
  },

  networks: {
    ethereum: {
      url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
      chainId: 1,
      accounts: [ process.env.PRIVATE_KEY],
    },
    bsc: {
      url: "https://bsc-dataseed1.binance.org",
      chainId: 56,
      accounts: [ process.env.PRIVATE_KEY],
    },
    avalanche: {
      url: "https://api.avax.network/ext/bc/C/rpc",
      chainId: 43114,
      accounts: [ process.env.PRIVATE_KEY],
    },
    polygon: {
      url: "https://rpc-mainnet.maticvigil.com",
      chainId: 137,
      accounts: [ process.env.PRIVATE_KEY],
    },
    arbitrum: {
      url: `https://arb1.arbitrum.io/rpc`,
      chainId: 42161,
      accounts: [ process.env.PRIVATE_KEY],
    },
    optimism: {
      url: `https://mainnet.optimism.io`,
      chainId: 10,
      accounts: [ process.env.PRIVATE_KEY],
    },
    fantom: {
      url: `https://rpcapi.fantom.network`,
      chainId: 250,
      accounts: [ process.env.PRIVATE_KEY],
    },
    metis: {
      url: `https://andromeda.metis.io/?owner=1088`,
      chainId: 1088,
      accounts: [ process.env.PRIVATE_KEY],
    },    
    linea: {
      url: `https://linea.blockpi.network/v1/rpc/public`,
      chainId: 59144,
      accounts: [ process.env.PRIVATE_KEY],
    },    
    base: {
      url: `https://base.gateway.tenderly.co`,
      chainId: 8453,
      accounts: [ process.env.PRIVATE_KEY],
    },
    zksync: {
      url: `https://zksync.meowrpc.com`,
      chainId: 324,
      accounts: [ process.env.PRIVATE_KEY],
    },
    mantle: {
      url: `https://mantle-mainnet.public.blastapi.io`,
      chainId: 5000,
      accounts: [ process.env.PRIVATE_KEY],
    },
    "polygon-zkevm": {
      url: `https://zkevm-rpc.com`,
      chainId: 1101,
      accounts: [ process.env.PRIVATE_KEY],
    },
    "arbitrum-nova": {
      url: `https://arbitrum-nova.publicnode.com`,
      chainId: 42170,
      accounts: [ process.env.PRIVATE_KEY],
    },
    
    goerli: {
      url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161", // public infura endpoint
      chainId: 5,
      accounts: [ process.env.PRIVATE_KEY],
    },
    'bsc-testnet': {
      url: 'https://bsc-testnet.publicnode.com',
      chainId: 97,
      accounts: [ process.env.PRIVATE_KEY],
    },
    fuji: {
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      chainId: 43113,
      accounts: [ process.env.PRIVATE_KEY],
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      chainId: 80001,
      accounts: [ process.env.PRIVATE_KEY],
    },
    'arbitrum-goerli': {
      url: `https://goerli-rollup.arbitrum.io/rpc/`,
      chainId: 421613,
      accounts: [ process.env.PRIVATE_KEY ],
    },
    'optimism-goerli': {
      url: `https://optimism-goerli.publicnode.com`,
      chainId: 420,
      accounts: [ process.env.PRIVATE_KEY ],
    },
    'fantom-testnet': {
      url: `https://rpc.ankr.com/fantom_testnet`,
      chainId: 4002,
      accounts: [ process.env.PRIVATE_KEY],
    },
    'linea-goerli': {
      url: `https://rpc.goerli.linea.build`,
      chainId: 59140,
      accounts: [ process.env.PRIVATE_KEY ],
    },
    'base-goerli': {
      url: `https://gateway.tenderly.co/public/base-goerli`,
      chainId: 84531,
      accounts: [ process.env.PRIVATE_KEY ],
    },
    'zksync-testnet': {
      url: `https://zksync2-testnet.zksync.dev`,
      chainId: 280,
      accounts: [ process.env.PRIVATE_KEY ],
    },
    'mantle-testnet': {
      url: `https://rpc.testnet.mantle.xyz`,
      chainId: 5001,
      accounts: [ process.env.PRIVATE_KEY ],
    },
    'polygon-zkevm-test': {
      url: `https://rpc.public.zkevm-test.net`,
      chainId: 1442,
      accounts: [ process.env.PRIVATE_KEY ],
    }
  }
};
