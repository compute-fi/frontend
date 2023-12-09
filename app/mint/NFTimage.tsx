import * as React from 'react';

interface NFTimageProps {
  url: string;
}

const NFTimage: React.FC<NFTimageProps> = ({ url }) => {
  return (
    <>
      <img
            src={url}
            alt="NFT"
            style={{ maxWidth: '35%', maxHeight: '35%', objectFit: 'contain' }}
          />
    </>
  );
};

export default NFTimage;
