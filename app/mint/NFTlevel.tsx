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

interface NFTlevelProps {
  level: string;
}

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const NFTlevel: React.FC<NFTlevelProps> = ({ level }) => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <DemoPaper square={false}>
        <Div>NFT level {level}</Div> 
        </DemoPaper>
      </Stack>
    </>
  );
};

export default NFTlevel;
