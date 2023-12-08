import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 240,
  height: 240,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

interface NFTimageProps {
  url: string;
}

const NFTimage: React.FC<NFTimageProps> = ({ url }) => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <DemoPaper square={false}>
        <img
            src={url}
            alt="NFT"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        </DemoPaper>
      </Stack>
    </>
  );
};

export default NFTimage;
