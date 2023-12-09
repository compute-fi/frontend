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


const contractConfig = {
  address: computeContractAddress,
  abi,
} as const;

const LogForm = () => {
    const [inputValue, setInputValue] = React.useState("");
    const [logCID, setlogCID] = React.useState("");
    const debouncedValue = useDebounce(inputValue, 500);
    console.log(debouncedValue);

    const { isConnected } = useAccount();

    const { config: contractWriteConfig, error: prepareError,
      isError: isPrepareError, } = usePrepareContractWrite({
      ...contractConfig,
      functionName: 'callLogAPI',
      args: ["0x33238F4C8C5C71E1A7a2802e290079665f532FbA","e74117d2ec984537a3a3db4dba6acf86",debouncedValue.toString()],
      enabled: Boolean(debouncedValue),
    });
    const { data: currentlogCID } = useContractRead({
      ...contractConfig,
      functionName: 'currentLogCID',
      watch: true,
    });
  
  
    React.useEffect(() => {
      if (currentlogCID) {
        // console.log(currentlogCID);
        setlogCID(currentlogCID.toString());
      }
    }, [currentlogCID]);

    function refreshlogCID(){
      if (currentlogCID) {
        console.log(currentlogCID);
        setlogCID(currentlogCID.toString());
      }
    }
  
    const { data, error, isError, write } = useContractWrite(contractWriteConfig)
 
    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

return(
<div className="glass-container">
  <h1 className="log-cid">{logCID?"Your Log CID is : "+logCID:"Get your Logs here."} 
</h1>

  <form onSubmit={(e) => {
    e.preventDefault();
    write?.();
  }} className="glass-form">
    <label htmlFor="tokenId">Enter Compute ID</label>
    <input
      id="tokenId"
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Compute ID here..."
      value={inputValue}
    />
    <button disabled={!write || isLoading}>
      {isLoading ? 'Checking log...' : 'Get Log'}
    </button>

    {isSuccess && (
      <div className="success-message">
        Successfully initiated. Please refresh logCID!
        <div>
          <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
        </div>
      </div>
    )}

    {(isPrepareError || isError) && (
      <div className="error-message">
        Error: {(prepareError || error)?.message}
      </div>
    )}
  </form>

  <button className="refresh-button" onClick={refreshlogCID}>
    Refresh for new logCID
  </button>
</div>

)
}

export default LogForm;