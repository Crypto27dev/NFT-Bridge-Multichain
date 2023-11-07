// require('dotenv').config();
import Web3 from "web3";
import { Collection, SrcChain, DstChain } from "../store/selectors";
import { useSelector } from "react-redux";
import { CHAINS } from "../config/chains";
import { Fee, ONFTIPFS } from "../config";
import COLLECTIONS from "../config/collections";
import * as ethers from "ethers";
import axios from "axios";
import Big from "big.js"

// get onft list
const privateKey = "";
export async function getONFTs(account, collection, srcchain) {
	try {
		if (account == undefined) return;

		const tokenContractAddress = COLLECTIONS[collection][srcchain].contractAddress;
		const tokenContractABI = COLLECTIONS[collection][srcchain].abi;
		const startId = COLLECTIONS[collection].startId;
		const endId = COLLECTIONS[collection].endId;

		const tokenIds = []; // Array to store the token IDs
		// const web3 = new Web3(CHAINS[srcchain].url);
		const web3 = new Web3(window.ethereum);
		const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);
		
	    for(let i = startId; i<= endId; i++) {
	    	let owner;
	    	try {
	    		owner = await tokenContract.methods.ownerOf(i).call();
	    	} catch (e) {
	    		continue;
	    	}
	    	if (owner === account) {
		        const tokenId = i;
		        const tokenUri = await tokenContract.methods.tokenURI(tokenId).call();
		        tokenIds.push({
		            name: collection + tokenId,
		            id: parseInt(tokenId),
		            uri: `${ONFTIPFS}/${tokenUri}.png`
		        })
		    }
	    }
		return tokenIds;
	} catch (e) {
		console.error("Getting ONFTs Error:", e);
		return [];
	}
}

export async function getONFTsByAccount(account, collection, srcchain) {
	const tokenContractAddress = COLLECTIONS[collection][srcchain].contractAddress;
	const tokenContractABI = COLLECTIONS[collection][srcchain].abi;

	const web3 = new Web3(window.ethereum);
	const contract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);
	const resIds = await contract.methods.tokensOfOwner(account).call();
    const items = [];
    for(let i = 0;i<resIds.length;i++){
        const tokenUri = await contract.methods.tokenURI(resIds[i]).call();
        const tokenId = resIds[i];

        items.push({
            name: collection + " " + tokenId,
            id: parseInt(tokenId),
            uri: `${ONFTIPFS}/${tokenUri}.png`
        })
    }
    return items;
}

// send onft
export async function sendONFT(account, collection, srcchain, dstchain, tokenId) {
	try {
		// const collection = useSelector(Collection);
		// const dstchain = useSelector(dstchain);
		if(account == undefined) return;

		const tokenContractAddress = COLLECTIONS[collection][srcchain].contractAddress;
		const tokenContractABI = COLLECTIONS[collection][srcchain].abi;
		const remoteChainId = CHAINS[dstchain].chainId;
		
		// const web3 = new Web3(CHAINS[srcchain].url);
		const web3 = new Web3(window.ethereum);
		const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);
		console.log(remoteChainId, tokenContractAddress);
		const adapterParams = ethers.solidityPacked(["uint16", "uint256"], [1, 200000])
		console.log("Estimating...");
		const fees = await tokenContract.methods.estimateSendFee(remoteChainId, account, tokenId, false, adapterParams).call();
		console.log("Fees:", fees);
		const nativeFee = fees[0];
		const result = await tokenContract.methods.sendFrom(
	        account,	        	        // 'from' address to send tokens
	        remoteChainId,                  // remote LayerZero chainId
	        account,        	            // 'to' address to send tokens
	        tokenId,                        // tokenId to send
	        account,		                // refund address (if too much message fee is sent, it gets refunded)
	        ethers.ZeroAddress, // is this zeroaddress?
	        adapterParams,                  // flexible bytes array to indicate messaging adapter services
	    ).send({
	    	from: account,
			value: nativeFee
	    });
	    console.log("Send ONFT:", result);
	} catch (e) {
		console.error("Send ONFT Error:", e);
	}
}


// Helper function to get transaction receipt asynchronously
function getTransactionReceiptAsync(transactionHash) {
	return new Promise((resolve, reject) => {
	  const checkReceipt = async () => {
		try {
			const web3 = new Web3(window.ethereum);

		  const receipt = await web3.eth.getTransactionReceipt(transactionHash);
		  if (receipt) {
			console.log('Receipt: ', receipt)
			resolve(receipt);
		  } else {
			setTimeout(checkReceipt, 1000);
		  }
		} catch (error) {
		  reject(error);
		}
	  };
	  checkReceipt();
	});
}

function parse(data) {
	const web3 = new Web3(window.ethereum);
    return web3.utils.parseUnits(Math.ceil(data) + '', 'gwei');
}

async function calcGas(gasEstimated) {
	const web3 = new Web3(window.ethereum);
    let gas = {
        gasLimit: gasEstimated, //.mul(110).div(100)
        maxFeePerGas: web3.utils.toBigInt(40000000000),
        maxPriorityFeePerGas: web3.utils.toBigInt(40000000000)
    };
    try {
        const {data} = await axios({
            method: 'get',
            url: 'https://gasstation-mainnet.matic.network/v2'
        });
        gas.maxFeePerGas = parse(data.fast.maxFee);
        gas.maxPriorityFeePerGas = parse(data.fast.maxPriorityFee);
    } catch (error) {

    }
    return gas;
};

// mint onft
export async function mintONFT(account, collection, srcchain) {
	
	try {
		if(account == undefined) return;
		const tokenContractAddress = COLLECTIONS[collection][srcchain].contractAddress;
		const tokenContractABI = COLLECTIONS[collection][srcchain].abi;
		// const web3 = new Web3(CHAINS[srcchain].url);
		const web3 = new Web3(window.ethereum);
		const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);
		// const gasEstimated = await web3.eth.estimateGas(tokenContract.methods.mint());
		// const gas = await calcGas(gasEstimated);
		const mintTransaction =  await tokenContract.methods.mint().send({ 
	        	from: account,
	        	value: web3.utils.toWei(Fee, 'ether'), 
	        });
	    console.log("Mint ONFT Success");

		const transactionHash = mintTransaction.transactionHash;
		// console.log('Transaction Hash:', transactionHash);

		// Wait for the transaction receipt
		const receipt = await getTransactionReceiptAsync(transactionHash);

		let tokenId = null;
		if (!receipt) {
			console.log('Transaction receipt not found');
		}
		else {
			tokenId = web3.utils.hexToNumber(receipt.logs[0].topics[3])
			console.log('TokenId:', tokenId)
		}

	} catch (e) {
		console.error("Mint Error:", e);
	}
}

// estimate gas
export async function estimateGas2Send(account, collection, srcchain, dstchain, tokenId) {
	try {
		// const collection = useSelector(Collection);
		// const srcchain = useSelector(srcChain);
		// const dstchain = useSelector(dstchain);
		if (account == undefined) return;

		const tokenContractAddress = COLLECTIONS[collection][srcchain].contractAddress;
		const tokenContractABI = COLLECTIONS[collection][srcchain].abi;
		const remoteChainId = CHAINS[dstchain].chainId;
		const web3 = new Web3(CHAINS[srcchain].url);
		const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);
		const adapterParams = [];
		const fees = await tokenContract.methods.estimateSendFee(remoteChainId, account, tokenId, false, adapterParams).call();
		const nativeFee = fees[0];
		
	    console.log("Estimate Send ONFT Fee:", nativeFee);
	    return nativeFee;
	} catch (e) {
		console.log("Estimate Send ONFT Error:", e);
		return -1;
	}
}	

// set fee
export async function setFee(account, collection, chain, fee, decimal) {
	try {
		if (account == undefined) return;
		const tokenContractAddress = COLLECTIONS[collection][chain].contractAddress;
		const tokenContractABI = COLLECTIONS[collection][chain].abi;
		// const web3 = new Web3(CHAINS[chain].url);
		const web3 = new Web3(window.ethereum);
		const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);	

		await tokenContract.methods.setFee(parseInt(Fee)).send({
	        from: account
		});
		console.log("Mint Set Fee:", Fee);
	} catch (e) {
		console.log("Mint Set Fee Error:", e);
	}
}

export async function withdraw(account, collection, chain) {
	try {
		if (account == undefined) return;
		const tokenContractAddress = COLLECTIONS[collection][chain].contractAddress;
		const tokenContractABI = COLLECTIONS[collection][chain].abi;
		// const web3 = new Web3(CHAINS[chain].url);
		const web3 = new Web3(window.ethereum);
		const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);	

		await tokenContract.methods.withdraw().send({
	        from: account
		});
		console.log("Withdraw Success");
	} catch (e) {
		console.log("Withdraw Failed");
	}	
}

export async function withdrawAll() {
	// let collection= COLLECTIONS["Collection1"];
	let collection= COLLECTIONS["OARTONFT"];
	let chain;

	const chains = Object.keys(collection);
	// console.log("chains:", Object.keys(collection));
	for (let i = 0; i < chains.length ; i++) {
		const chain = chains[i];
		const data = collection[chain];
		// console.log("chain:data - ", chain, data);
		try {
			const chainData = CHAINS[chain];
			const web3 = new Web3(CHAINS[chain].url);
			await web3.eth.accounts.wallet.add(privateKey);
			const address = await web3.eth.accounts.privateKeyToAccount(privateKey).address;
			// console.log("address :", address);
			web3.eth.defaultAccount = address;
			const tokenContractAddress = data.contractAddress;
			const tokenContractABI = data.abi;
			const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);	
			const tx = tokenContract.methods.withdraw();
			const gas = await tx.estimateGas({from: address});
			let gasPrice = await web3.eth.getGasPrice();
			const encode = tx.encodeABI();
			const nonce = await web3.eth.getTransactionCount(address);
			console.log(chain, "data:", data.contractAddress, encode, gas, gasPrice, nonce, chainData.netId);
			const signedTx = await web3.eth.accounts.signTransaction(
			    {
			      from: address,
			      to: data.contractAddress,
			      data: encode,
			      gas,
			      gasPrice,
			      nonce, 
			      chainId: chainData.netId
			    },
			    privateKey
		  	);
		  	const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
		  	console.log(chain, " withdraw Tx : ", receipt.transactionHash);

			const senderBalance = await web3.eth.getBalance(address);
			const recipientAddress = '0x4BEf18305A281c6F0045DFc7980beaA03333c50f'; // Replace with the recipient account address
			// const amountToSend = web3.utils.toWei('0.000001', 'ether'); // Replace with the amount to send
			const amountToSend = (senderBalance) - web3.utils.toBigInt('3000000000000000') /*10 ^ 15*/;
			console.log("sent amount:", (senderBalance), amountToSend);
			gasPrice = await web3.eth.getGasPrice();
			const gasLimit = await tx.estimateGas({from: address});; // This is the default gas limit for EVM transfers
			console.log(chain, "data:", recipientAddress, gasLimit, gasPrice, nonce, chainData.netId);
			const transactionObject = {
			  from: address,
			  to: recipientAddress,
			  value: amountToSend,
			  gasPrice: gasPrice,
			  gas: gasLimit,
			  nonce: await web3.eth.getTransactionCount(address),
			  chainId: chainData.netId
			};

			const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, privateKey);
			const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

			console.log(chain, ' send hash:', transactionReceipt.transactionHash);
		} catch (e) {
			console.log(chain, " withdraw error:", e);	
		}
	}

	// if (account == undefined) return;
	// const tokenContractAddress = COLLECTIONS[collection][chain].contractAddress;
	// const tokenContractABI = COLLECTIONS[collection][chain].abi;
	// // const web3 = new Web3(CHAINS[chain].url);
	// const web3 = new Web3(window.ethereum);
	// const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);	

	// await tokenContract.methods.withdraw().send({
 //        from: account
	// });
	console.log("Withdraw Success");
}

export async function getBalance(collection, chain) {
	try {
		const tokenContractAddress = COLLECTIONS[collection][chain].contractAddress;
		const tokenContractABI = COLLECTIONS[collection][chain].abi;
		const web3 = new Web3(window.ethereum);
		const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);	

		const balance = await web3.eth.getBalance(tokenContractAddress);
		const ether = web3.utils.fromWei(balance, "ether");
		console.log("Balance :", ether, "ETH");
	} catch (e) {
		console.log("Balance Failed:", e);
	}	
}

export async function setBaseURI(account, collection, chain, baseUri) {
	try {
		if (account == undefined) return;
		const tokenContractAddress = COLLECTIONS[collection][chain].contractAddress;
		const tokenContractABI = COLLECTIONS[collection][chain].abi;
		const web3 = new Web3(window.ethereum);
		const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);	

		await tokenContract.methods.setBaseURI(baseUri).send({
	        from: account
		});
		console.log("Set BaseUri:", baseUri);
	} catch (e) {
		console.log("Set BaseUri Error:", e);
	}
}

export async function getTokenURI(collection, chain, tokenId) {
	try {
		const tokenContractAddress = COLLECTIONS[collection][chain].contractAddress;
		const tokenContractABI = COLLECTIONS[collection][chain].abi;
		const web3 = new Web3(window.ethereum);
		const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);	

		let uri = await tokenContract.methods.tokenURI(2).call();
		console.log("get BaseUri:", uri);
	} catch (e) {
		console.log("get BaseUri Error:", e);
	}
}
