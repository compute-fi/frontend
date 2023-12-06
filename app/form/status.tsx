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

const StatusForm = () => {
    const [inputValue, setInputValue] = React.useState("");
    const [Status, setStatus] = React.useState("null");
    const debouncedValue = useDebounce(inputValue, 500);
    console.log(debouncedValue);

    const { isConnected } = useAccount();

    const { config: contractWriteConfig, error: prepareError,
      isError: isPrepareError, } = usePrepareContractWrite({
      ...contractConfig,
      functionName: 'callStatus',
      args: ["0x33238F4C8C5C71E1A7a2802e290079665f532FbA","6c071cdf64374795a5ea4e238505da46",debouncedValue.toString()],
      enabled: Boolean(debouncedValue),
    });
    const { data: currentStatus } = useContractRead({
      ...contractConfig,
      functionName: 'currentStatus',
      watch: true,
    });
  
  
    React.useEffect(() => {
      if (currentStatus) {
        // console.log(currentStatus);
        setStatus(currentStatus.toString());
      }
    }, [currentStatus]);

    function refreshStatus(){
      if (currentStatus) {
        console.log(currentStatus);
        setStatus(currentStatus.toString());
      }
    }
  
    const { data, error, isError, write } = useContractWrite(contractWriteConfig)
 
    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

return(
    <>
                <p style={{ margin: '12px 0 24px' }}>
                The Status is {(Status)}
            </p>

<form
      onSubmit={(e) => {
        e.preventDefault()
        write?.()
      }}
    >
      <label htmlFor="tokenId">Enter the Compute ID</label>
      <input
        id="tokenId"
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="ComputeID here..."
        value={inputValue}
      />
      <button disabled={!write || isLoading}>
        {isLoading ? 'Checking Status...' : 'Check Status'}
      </button>
      {isSuccess && (
        <div>
          Successfully initiated. Please refresh Status! 
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </form>
    <button onClick={refreshStatus}>Refresh for new Status</button>
    </>
)
}

export default StatusForm;