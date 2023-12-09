"use client";
import React from "react";
import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import ComputeTaskTable from './ComputeTaskTable'
import { gridSpacing } from './store/constant';
import PageHead from "./pageHead";


const Compute = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return <>
  <Grid container spacing={gridSpacing}>
    <PageHead/>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <ComputeTaskTable/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  
  </>;
};

export default Compute;
