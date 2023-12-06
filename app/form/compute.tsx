
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

const contractConfig = {
  address: '0x2f5789DC7615a532881ed67D6731dC54A5e8FE77',
  abi,
} as const;

const ComputeForm = () => {
    const [inputValue, setInputValue] = React.useState("");
    const [computeID, setcomputeID] = React.useState("null");
    const debouncedValue = useDebounce(inputValue, 500);
    console.log(debouncedValue);

    const { isConnected } = useAccount();

    const { config: contractWriteConfig, error: prepareError,
      isError: isPrepareError, } = usePrepareContractWrite({
      ...contractConfig,
      functionName: 'callAPI',
      args: ["0x33238F4C8C5C71E1A7a2802e290079665f532FbA","aa491301949d4a4e93d460bdf12c372f",debouncedValue.toString()],
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
    <>
                <p style={{ margin: '12px 0 24px' }}>
                The computeID is {(computeID)}
            </p>

<form
      onSubmit={(e) => {
        e.preventDefault()
        write?.()
      }}
    >
      <label htmlFor="tokenId">Enter Raw File URL</label>
      <input
        id="tokenId"
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="URL here ...."
        value={inputValue}
      />
      <button disabled={!write || isLoading}>
        {isLoading ? 'Calling Compute...' : 'Compute'}
      </button>
      {isSuccess && (
        <div>
          Successfully initiated. Please refresh ComputeID! 
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan </a>{data?.hash}
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </form>
    <button onClick={refreshComputeID}>Refresh for new compute ID</button>
    </>
)
}

export default ComputeForm;