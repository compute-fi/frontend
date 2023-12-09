import * as React from 'react';

interface ComputeBalanceProps {
  balance: string;
}


const ComputeBalance: React.FC<ComputeBalanceProps> = ({ balance }) => {
  return (
    <>
      <h1>Compute Balance {balance}</h1>
    </>
  );
};

export default ComputeBalance;
