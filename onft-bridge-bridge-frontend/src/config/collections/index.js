
import Col1_Mumbai from "./abis/col1_mumbai.json";
import Col1_Op_Goerli from "./abis/col1_op_goerli.json";
import ENUM_Op_Goerli from "./abis/enum_op_goerli.json";
import ENUM_Base_Goerli from "./abis/enum_base_goerli.json";
import ENUM_Bsc_Testnet from "./abis/enum_bsc_testnet.json";
import ENUM_Linea_Goerli from "./abis/enum_linea_goerli.json";
import ENUM_Mantle_Testnet from "./abis/enum_mantle_testnet.json";
import ENUM_Mumbai from "./abis/enum_mumbai.json";
import ENUM_Polygon_Zkevm_Testnet from "./abis/enum_polygon_zkevm_testnet.json";
import ENUM_ZkSync_Testnet from "./abis/enum_zksync_testnet.json";
import ENUM_Polygon from "./abis/enum_polygon.json";
import ENUM_ZkSync from "./abis/enum_zksync.json";
import ENUM_BSC from "./abis/enum_bsc.json";


const Collections = {
	"Collection1" : {
		// "optimism-goerli": { 
		// 	contractAddress: "0x06918Be9843BA1F6Ba9289e93c29e8cFA5aCb470",
		// 	abi: ENUM_Op_Goerli,
		// },
		// "mumbai": {
		// 	contractAddress: "0xE65c9828f6cB33E1248a2e4AAeDC1f841c3c1C93",
		// 	abi: ENUM_Mumbai,
		// },
		// "base-goerli": {
		// 	contractAddress: "0x978b8B1E7C0049AA8acC353773efa1015a9AaEf1",
		// 	abi: ENUM_Base_Goerli,
		// },
		// "bsc-testnet": {
		// 	contractAddress: "0xbde34C8204F7e05bF7e7b1c7039208dAB6CEf714",
		// 	abi: ENUM_Bsc_Testnet,
		// },
		// "linea-goerli": {
		// 	contractAddress: "0x978b8B1E7C0049AA8acC353773efa1015a9AaEf1",
		// 	abi: ENUM_Linea_Goerli,
		// },
		// "mantle_testnet": {
		// 	contractAddress: "0x978b8B1E7C0049AA8acC353773efa1015a9AaEf1",
		// 	abi: ENUM_Mantle_Testnet,
		// },
		// "polygon-zkevm-test": {
		// 	contractAddress: "0x978b8B1E7C0049AA8acC353773efa1015a9AaEf1",
		// 	abi: ENUM_Polygon_Zkevm_Testnet,
		// },
		// "zksync-testnet": {
		// 	contractAddress: "0xA3D45BE8f56eDCB11F6B162BCF7C1fd78f700218",
		// 	abi: ENUM_ZkSync_Testnet,
		// },
		"polygon": {
			contractAddress: "0x978b8B1E7C0049AA8acC353773efa1015a9AaEf1",
			abi: ENUM_Polygon,
		},
		"zksync": {
			contractAddress: "0x7A8c4569aDA01a8B251371d2f63bD078eAb793AD",
			abi: ENUM_ZkSync,
		},
		"optimism": {
			contractAddress: "0x978b8B1E7C0049AA8acC353773efa1015a9AaEf1",
			abi: ENUM_ZkSync,
		},
		"base": {
			contractAddress: "0x978b8B1E7C0049AA8acC353773efa1015a9AaEf1",
			abi: ENUM_ZkSync,
		},
		"bsc": {
			contractAddress: "0x978b8B1E7C0049AA8acC353773efa1015a9AaEf1",
			abi: ENUM_BSC,
		},
		"linea": {
			contractAddress: "0x978b8B1E7C0049AA8acC353773efa1015a9AaEf1",
			abi: ENUM_ZkSync,
		},
		"mantle": {
			contractAddress: "0x978b8B1E7C0049AA8acC353773efa1015a9AaEf1",
			abi: ENUM_ZkSync,
		},
		"polygon-zkevm": {
			contractAddress: "0x978b8B1E7C0049AA8acC353773efa1015a9AaEf1",
			abi: ENUM_ZkSync,
		},
	},
	"OARTONFT" : {
		"polygon": {
			contractAddress: "0x3DD2eDb1f60e09D0FB7b84a2cCaB2987a80aE9FF",
			abi: ENUM_Polygon,
		},
		"optimism": {
			contractAddress: "0x3A584caaF4b0BfA8653895Ae8c9AfD2e309f140B",
			abi: ENUM_Polygon,
		},
		"zksync": {
			contractAddress: "0x3dDF4073fE67b94c955BFe3AFFd7212E84a96112",
			abi: ENUM_Polygon,
		},
		"base": {
			contractAddress: "0xa89c4c5D9DB28708D371A9315A777602ae321108",
			abi: ENUM_Polygon,
		},
		"bsc": {
			contractAddress: "0xdfd719bfc9c52e180BA56bbc368c62d4d060C8D0",
			abi: ENUM_Polygon,
		},
		"linea": {
			contractAddress: "0xa89c4c5D9DB28708D371A9315A777602ae321108",
			abi: ENUM_Polygon,
		},
		"mantle": {
			contractAddress: "0x2e801D9f388b750C6Cb25c27dF5d104384Ff3daB",
			abi: ENUM_Polygon,
		},

		"polygon-zkevm": {
			contractAddress: "0xdfd719bfc9c52e180BA56bbc368c62d4d060C8D0",
			abi: ENUM_Polygon,
		},
	}
}

export default Collections;