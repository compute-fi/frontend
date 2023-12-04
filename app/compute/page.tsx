"use client";
import React from "react";
import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import NFTlevel from "./NFTlevel";
import ComputeBalance from "./ComputeBalance";
import NFTimage from "./NFTimage";
import ComputeTaskTable from './ComputeTaskTable'
import { gridSpacing } from './store/constant';
import ComputeLog from "./ComputeLog";


const Compute = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return <>
  <Grid container spacing={gridSpacing}>
      <Grid item xs={8}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <NFTimage />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <NFTlevel />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <ComputeBalance  />
          </Grid>
        </Grid>
      </Grid>
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
