const TEST_CHAINS = [
    "mumbai",
    "optimism-goerli",
    "bsc-testnet",
    "base-goerli", // can't setMinGas
    "zksync-testnet", // can't deploy
    "mantle-testnet",
    "polygon-zkevm-test",
    'linea-goerli'
]

const CHAINS = [
    "polygon",
    "optimism",
    "bsc",
    "base",
    "zksync",
    "mantle",
    "polygon-zkevm",
    "linea",
]

module.exports = {TEST_CHAINS, CHAINS};
