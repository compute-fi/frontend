
import * as React from 'react';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { abi } from '../contracts/compute-contract-abi';
import { useDebounce } from './useDebounce';
import '../styles/styles/styles.css'; // Import the CSS file
import { computeContractAddress } from '../contracts/address';


const contractConfig = {
  address: computeContractAddress,
  abi,
} as const;

const UpdateForm = () => {
    const [computeID, setcomputeID] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [logCID, setLogCID] = React.useState("");
    const [computeTime, setComputeTime] = React.useState("");
    const debouncedValue1 = useDebounce(computeID, 500);
    const debouncedValue2 = useDebounce(status, 500);
    const debouncedValue3 = useDebounce(logCID, 500);
    const debouncedValue4 = useDebounce(computeTime, 500);

    const { isConnected } = useAccount();

    const { config: contractWriteConfig, error: prepareError,
      isError: isPrepareError, } = usePrepareContractWrite({
      ...contractConfig,
      functionName: 'updateTransaction',
      args: [debouncedValue1.toString(),debouncedValue2.toString(),debouncedValue3.toString(),parseInt(debouncedValue4)],
      enabled: Boolean(debouncedValue1),
    });
  
    const { data, error, isError, write } = useContractWrite(contractWriteConfig)
 
    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

return(
    <>
<div className="glass-container">
  <h1 className="update">
    Update these info on contract.
  </h1>

  <form onSubmit={(e) => {
    e.preventDefault();
    write?.();
  }} className="glass-form">
    <label htmlFor="computeID">Enter the Compute ID</label>
    <input
      id="computeID"
      onChange={(e) => setcomputeID(e.target.value)}
      placeholder="Compute ID here ...."
      value={computeID}
    />
    <br/>
    <label htmlFor="transactionHash">Enter the Status</label>
    <input
      id="transactionHash"
      onChange={(e) => setStatus(e.target.value)}
      placeholder="Transaction Hash here ...."
      value={status}
    />
    <br/>
   
    <label htmlFor="logCID">Enter the Log CID</label>
    <input
      id="logCID"
      onChange={(e) => setLogCID(e.target.value)}
      placeholder="Compute ID here ...."
      value={logCID}
    />
    <br/>
    <label htmlFor="computeTime">Enter the Compute Time</label>
    <input
      id="computeTime"
      onChange={(e) => setComputeTime(e.target.value)}
      placeholder="Transaction Hash here ...."
      value={computeTime}
    />
    <br/>
   
    <button disabled={!write || isLoading} className="glass-button">
      {isLoading ? 'Adding Compute Data...' : 'Add Data'}
    </button>

    {isSuccess && (
      <div className="glass-message">
        Successfully added Compute Info!
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
</div>

    </>
)
}

export default UpdateForm;