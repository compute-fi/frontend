"use client";
import * as React from 'react';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { dNFTabi } from '../contracts/dynamic-nft-abi';
import axios from 'axios';
import { useDebounce } from './useDebounce'

const contractConfig = {
  address: '0x2d16Bf21136d3A0C0d4BE06569B01EA0533f80B9',
  abi: dNFTabi,
} as const;


import NFTlevel from "./NFTlevel";
import ComputeBalance from "./ComputeBalance";
import NFTimage from "./NFTimage";
import { Grid } from '@mui/material';
import { gridSpacing } from './store/constant';

async function getImageUrl(url: string) {
    try {
        // Make a GET request to the specified URL
        const response = await axios.get(url);
    
        // Access the data from the response
        const data = response.data;
    
        // Display the data on the HTML page
        console.log("DATA", data.image)
        return data.image
      } catch (error) {
        // Handle errors
        console.error('Error fetching and rendering data:', error);
      }
  }
  
const Mint = () => {
    const [tokenURI, setTokenURI] = React.useState("");
    const [level, setLevel] = React.useState("");
    const [balance, setBalance] = React.useState("");
    const [imgUrl, setImgUrl] = React.useState("");
    const { data: currentTokenURI } = useContractRead({
        ...contractConfig,
        functionName: 'tokenURI',
        args: [1],
        watch: true,
      });
      const { data: currentLevel } = useContractRead({
          ...contractConfig,
          functionName: 'checkRobotlvl',
          args: [1],
          watch: true,
        });
        const { data: currentBalance } = useContractRead({
            ...contractConfig,
            functionName: 'checkNewMockFundSize',
            args: [1],
            watch: true,
          });
   
    async function fetchData() {
       
        if (currentTokenURI!=null && currentTokenURI!="" &&
            currentLevel!=null && currentLevel!="" &&
            currentBalance!=null && currentBalance!=""
        ) {
          setTokenURI(currentTokenURI.toString());
          setLevel(currentLevel.toString());
          setBalance(currentBalance.toString());
          try {
            const imageUrl = await getImageUrl(currentTokenURI.toString());
            console.log("Image url",imageUrl)
            setImgUrl(imageUrl);
          } catch (error) {
            console.error('Error fetching image URL:', error);
          }
        }
      }
  
    React.useEffect(() => {
      fetchData();
    }, []);

    const [inputValue, setInputValue] = React.useState("");
    const debouncedValue = useDebounce(inputValue, 500);
    console.log(debouncedValue);

    const { isConnected } = useAccount();

    const { config: contractWriteConfig, error: prepareError,
      isError: isPrepareError, } = usePrepareContractWrite({
      ...contractConfig,
      functionName: 'publicMint',
      value: BigInt(1000000000000000),
      // args: [parseInt(debouncedValue)],
      // enabled: Boolean(debouncedValue),
    });
    
    const { data, error, isError, write } = useContractWrite(contractWriteConfig)
 
    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })
    
    return (
      <>
        <Grid item xs={8}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <NFTimage url={imgUrl}/>
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <NFTlevel level={level}/>
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <ComputeBalance balance={balance}/>
            </Grid>
          </Grid>
        </Grid>
        <div>

<form
      onSubmit={(e) => {
        e.preventDefault()
        write?.()
      }}
    >
      <label htmlFor="tokenId">Enter 0.001+ Ethers</label>
      <input
        id="tokenId"
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Eth value here ...."
        value={inputValue}
      />
      <button disabled={!write || isLoading}>
        {isLoading ? 'Calling public Mint...' : 'Mint NFT'}
      </button>
      {isSuccess && (
        <div>
          Successfully Minted! 
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan </a>{data?.hash}
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </form>
        </div>
      </>
    );
  };
  
  export default Mint;