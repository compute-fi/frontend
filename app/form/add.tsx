
import * as React from 'react';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { abi } from '../contracts/compute-contract-abi';
import { useDebounce } from './useDebounce'
import '../styles/styles/styles.css'; // Import the CSS file


const contractConfig = {
  address: '0x2f5789DC7615a532881ed67D6731dC54A5e8FE77',
  abi,
} as const;

const AddForm = () => {
    const [computeID, setcomputeID] = React.useState("");
    const [transactionHash, setTransactionHash] = React.useState("");
    const debouncedValue1 = useDebounce(computeID, 500);
    const debouncedValue2 = useDebounce(transactionHash, 500);

    const { isConnected } = useAccount();

    const { config: contractWriteConfig, error: prepareError,
      isError: isPrepareError, } = usePrepareContractWrite({
      ...contractConfig,
      functionName: 'addTransaction',
      args: [debouncedValue1.toString(),debouncedValue2.toString()],
      enabled: Boolean(debouncedValue1),
    });
  
    const { data, error, isError, write } = useContractWrite(contractWriteConfig)
 
    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

return(
    <>
    <div className="glass-container">
  <h1 className="add">Save your data to contract
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
    <label htmlFor="transactionHash">Enter the Transaction Hash</label>
    <input
      id="transactionHash"
      onChange={(e) => setTransactionHash(e.target.value)}
      placeholder="Transaction Hash here ...."
      value={transactionHash}
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

export default AddForm;