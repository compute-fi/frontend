import * as React from 'react';

interface NFTlevelProps {
  level: string;
}


const NFTlevel: React.FC<NFTlevelProps> = ({ level }) => {
  return (
    <>
      <h1>NFT level {level}</h1>
    </>
  );
};

export default NFTlevel;
