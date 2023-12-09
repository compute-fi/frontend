
import * as React from 'react';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { abi } from '../contracts/compute-contract-abi';
import { useDebounce } from './useDebounce'
import '../styles/styles/styles.css'; // Import the CSS file
import { computeContractAddress } from '../contracts/address';
import Link from 'next/link';



const contractConfig = {
  address: computeContractAddress,
  abi,
} as const;

const ComputeForm = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [tokenID, setTokenID] = React.useState("");
  const [computeID, setcomputeID] = React.useState("");
  const debouncedValue = useDebounce(inputValue, 500);
  const debouncedValue2 = useDebounce(tokenID, 500);
    console.log(debouncedValue);

    const { isConnected } = useAccount();

    const { config: contractWriteConfig, error: prepareError,
      isError: isPrepareError, } = usePrepareContractWrite({
      ...contractConfig,
      functionName: 'callAPI',
      args: ["0x33238F4C8C5C71E1A7a2802e290079665f532FbA","aa491301949d4a4e93d460bdf12c372f",debouncedValue.toString(),parseInt(debouncedValue2)],
      enabled: Boolean(debouncedValue),
    });
    const { data: currentcomputeID } = useContractRead({
      ...contractConfig,
      functionName: 'currentFolderID',
      watch: true,
    });
  
  
    React.useEffect(() => {
      if (currentcomputeID) {
        // console.log(currentcomputeID);
        setcomputeID(currentcomputeID.toString());
      }
    }, [currentcomputeID]);

    function refreshComputeID(){
      if (currentcomputeID) {
        console.log(currentcomputeID);
        setcomputeID(currentcomputeID.toString());
      }
    }
  
    const { data, error, isError, write } = useContractWrite(contractWriteConfig)
 
    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

return(
  <div className="glass-container">
  <h1 className="compute-id">{computeID?"Your Compute ID is : "+computeID:"Compute your script/notebook."} 
</h1>
<p>Requirements:</p>
<ul>1. Make sure you have deposited some eth to this compute <Link href={'https://goerli.etherscan.io/address/0x0Bc19dF8279244Bf643c6F9752C36f10d1b4642c'} target="_blank">contract</Link></ul>
<ul>2. Make sure you have minted this <Link href={'/mint'} target="_blank">dNFT</Link></ul>

  <form onSubmit={(e) => {
    e.preventDefault();
    write?.();
  }} className="glass-form">
  <label htmlFor="computeId">Enter Raw File URL</label>
  <input
    id="computeId"
    onChange={(e) => setInputValue(e.target.value)}
    placeholder="URL here ...."
    value={inputValue}
  />
  <label htmlFor="tokenId">Enter NFT token ID</label>
  <input
    id="tokenId"
    onChange={(e) => setTokenID(e.target.value)}
    placeholder="NFT Token ID here to Verify ...."
    value={tokenID}
  />
    <button disabled={!write || isLoading} className="glass-button">
      {isLoading ? 'Calling Compute...' : 'Compute'}
    </button>

    {isSuccess && (
      <div className="glass-message">
        Successfully initiated. Please refresh ComputeID!
        <div>
          <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan </a>{data?.hash}
        </div>
      </div>
    )}

    {(isPrepareError || isError) && (
      <div className="glass-error">
        Error: {(prepareError || error)?.message}
      </div>
    )}
  </form>

  <button onClick={refreshComputeID} className="refresh-button">
    Refresh for new compute ID
  </button>
</div>

)
}

export default ComputeForm;