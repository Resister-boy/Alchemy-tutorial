import React, { useState} from "react"

const Home = () => {

  const ETHEREUM_API_KEY = process.env.ETHEREUM_API_KEY
  const [ walletAddress, setWalletAddress ] = useState<string>("");
  const [ collectionAddress, setCollectionAddress ] = useState("");
  const [ fetchForCollection, setFetchForCollection ] = useState(false);
  const [ NFTs, setNFTs] = useState([])

  const getWalletAddress = (event:any) => {
    setWalletAddress(event.target.value)
  }

  const getCollectionAddress = (event:any) => {
    setCollectionAddress(event.target.value)
  }

  const getFetchForCollection = (event:any) => {
    setFetchForCollection(event.target.checked)
  }

  const fetchNFTsAccordingCondition = async() => {
    if(fetchForCollection) {
      await fetchNFTs()
    } else {
      await fetchNFTsForCollection()
    }
  }

  const fetchNFTs = async() => {
    let initialNfts:any; 
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${ETHEREUM_API_KEY}/getNFTs/`;
    let requestOptions = {
        method: 'GET'
      };
     
    if (!collectionAddress.length) {
      const fetchURL = `${baseURL}?owner=${walletAddress}`;
      initialNfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`;
      initialNfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    }
  
    if (initialNfts) {
      console.log("nfts:", initialNfts)
      setNFTs(initialNfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async() => {
    if (collectionAddress.length) {
      let requestOptions = {
        method: 'GET'
      };

      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${ETHEREUM_API_KEY}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions)
        .then(data => data.json())
        .catch(error => console.log(error))

      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }
 
  return (
    <main className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input type={"text"} onChange={getWalletAddress} placeholder="Add your wallet address" className="w-80 h-10 pl-2 rounded-md bg-[#eee] outline-none"></input>
        <input type={"text"} onChange={getCollectionAddress} placeholder="Add the collection address" className="w-80 h-10 pl-2 rounded-md bg-[#eee] outline-none"></input>
        <label className="text-gray-600 ">
          <input type={"checkbox"} onChange={getFetchForCollection} className="mr-2"></input>
          <span className="select-none">Fetch for collection</span>
        </label>
        <button onClick={fetchNFTsAccordingCondition} className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-md w-1/5"}>Let's go!</button>
      </div>
    </main>
  )
}

export default Home
