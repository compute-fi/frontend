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

export default function ComputeBalance() {
    return (
      <>
    <Stack direction="row" spacing={2}>
      <DemoPaper square={false}>Compute Balance</DemoPaper>
    </Stack>
      </>
    );
  }