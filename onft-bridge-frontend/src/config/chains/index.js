// chainId = remotechainid
// netId = rpc chain id
export const CHAINS = {
	"optimism-goerli": {
		name: "Optimism Goerli",
		url: 'https://optimism-goerli.public.blastapi.io',
		chainId: 10132,
		netId: 420,
  	},
  	"mumbai": {
  		name: "Polygon Mumbai",
		url: "https://rpc-mumbai.maticvigil.com/",
		chainId: 10109,
		netId: 80001,
    },
    polygon: {
    	name: "Polygon",
		url: "https://polygon-rpc.com",
		chainId: 109,
		netId: 137,
    },
    optimism: {
		name: "Optimism",
		url: `https://mainnet.optimism.io`,
		chainId: 111,
		netId: 10,
    },
    zksync: {
		name: "ZkSync",
		url: `https://zksync.meowrpc.com`,
		chainId: 165,
		netId: 324,
    },
    bsc: {
		name: "BSC",
		url: "https://rpc.ankr.com/bsc",
		chainId: 102,
		netId: 56,
    },
    base: {
		name: "Base",
      url: `https://base.blockpi.network/v1/rpc/public`,
      chainId: 184,
		netId: 8453,
    },
    mantle: {
		name: "mantle",
      url: `https://mantle-mainnet.public.blastapi.io`,
      chainId: 181,
		netId: 5000,
    },
    "polygon-zkevm": {
		name: "Polygon-ZkEVM",
      url: `https://zkevm-rpc.com`,
      chainId: 158,
		netId: 1101,
    },
    "linea": {
	name: "Linea",
      url: `https://1rpc.io/linea`,
      chainId: 183,
		netId: 59144,
    },
}

