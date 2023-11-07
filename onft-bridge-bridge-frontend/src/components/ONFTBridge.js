import React, { useEffect, useState } from 'react';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import { getONFTs, mintONFT, sendONFT, getONFTsByAccount, withdraw, getBalance, getTokenURI, withdrawAll } from "../web3/module";


const ONFTBridge = () => {
  const [nfts, setNfts] = useState(null)
  const [turboBridging, setTurboBridging] = useState(false)
  const { isConnected, address } = useAccount();

  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

  const UpdateONFTs = async () => {
    let onfts = await getONFTs(address, "Collection1", "polygon");
    setNfts(onfts);
  }

  useEffect(() => {
    console.log("wagmi account:", isConnected, address);
    const UpdateONFTs = async () => {
      let onfts = await getONFTsByAccount(address, "OARTONFT", "optimism");
      let uri = await getTokenURI("OARTONFT", "optimism", 1);
      setNfts(onfts);
    }

    var nfts = [
      { address: '0xcsdfdsfdsFD', name: 'NFT Example 1' },
      { address: '0xcsdfdsfdsFH', name: 'NFT Example 2' }
    ]

    UpdateONFTs();
  }, [address])

  useEffect(() => {
    console.log(nfts);
  }, [nfts])

  const onMint = () => {
    console.log("Minting...");
    mintONFT(address, "Collection1", "polygon");
  }

  const onBridge = () => {
    sendONFT(address, "Collection1", "polygon", "base", 407);
  }

  const onWithdraw = () => {
    withdraw(address, "OARTONFT", "linea");
  }

  const onWithdrawAll = () => {
    withdrawAll();
  }


  const onGetBalance = () => {
    getBalance("Collection1", "polygon");
  }

  return (
    <div className='container text-start'>
      <h2 className='text-center my-4'>ONFT BRIDGE</h2>
      <div className="row border border-success p-3">
        <div className="col-md-5">
          <img className='w-100' src="https://m1.material.io/assets/0Bx4BSt6jniD7MEtzZUxkM0tzeGs/style-logos-product-lighting-shadow.png" alt="" />
          <div className="border bg-light p-3">
            <p className='mb-0'><strong>Contract Address:</strong> 0xgfhfhgfhg.jhghgh</p>
            <p className='mb-0'><strong>Blockchain:</strong> Linea</p>
            <p className='mb-0'><strong>Total NFTs minted:</strong> 999</p>
          </div>
        </div>
        <div className="col-md-7">
          <h2>LayerZero Multichain Power XL V2</h2>
          <p>Projects: LayerZero, Arbitrum Nova, Avalanche, Linea, Base, Mantle, zkSync Era, Polygon zkEVM</p>
          <p>
            NFT Details: You can mint the LayerZero Multichain Power XL and bridge across 7 blockchains (Arbitrum Nova, Avalanche, Linea, Base, Mantle, zkSync Era, Polygon zkEVM) with the help of LayerZero protocols.
            LayerZero provides a seamless bridge between diverse blockchains, enabling effortless transfer of NFT assets. Say goodbye to the limitations of a single blockchain and embrace the freedom to navigate multiple ecosystems, expanding your reach and unlocking new opportunities.
          </p>
          <h5>Free mint + 0.00023 ETH platform fee</h5>
          {/* Connect button if wallet not connected yet or Mint button if wallet already connected */}
          <button
            className='btn btn-primary'
            onClick={() => {
              onMint();
            }}
          >
            Connect / Mint
          </button>

          <select className='form-select mt-3'>
            <option value="null" disabled>---Select NFT---</option>
            {nfts && nfts.map((nft, index) => (
              <option value={nft.id} key={index}>{nft.name}</option>
            ))}
          </select>

          <div className="form-check form-switch mt-3">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked={turboBridging} onChange={() => setTurboBridging(!turboBridging)} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Turbo Bridging</label>
          </div>

          <select className='form-select mt-3' multiple={turboBridging}>
            <option value="null" disabled>---Select NFT---</option>
            {nfts && nfts.map((nft, index) => (
              <option value={nft.address} key={index}>{nft.name}</option>
            ))}
          </select>

          <button
            className='btn btn-primary mt-3'
            onClick={() => {
              onBridge();
            }}>
            Bridge
          </button>

          <button
            className='btn btn-primary mt-3'
            onClick={() => {
              onWithdraw();
            }}>
            Withdraw
          </button>

          <button
            className='btn btn-primary mt-3'
            onClick={() => {
              onWithdrawAll();
            }}>
            WithdrawAll
          </button>

          <button
            className='btn btn-primary mt-3'
            onClick={() => {
              onGetBalance();
            }}>
            Balance
          </button>

          <p>Layerzero scan link: <a href="">0xfdsfd1sf54ds5f4...5151</a>(need to show after successfull bridging)</p>

        </div>
      </div>
    </div>
  );
};

export default ONFTBridge;
