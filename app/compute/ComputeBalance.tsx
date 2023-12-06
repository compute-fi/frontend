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

interface ComputeBalanceProps {
  balance: string;
}

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const ComputeBalance: React.FC<ComputeBalanceProps> = ({ balance }) => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <DemoPaper square={false}>
        <Div>Compute Balance {balance}</Div>
        </DemoPaper>
      </Stack>
    </>
  );
};

export default ComputeBalance;
