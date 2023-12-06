import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Header from "../components/Header";
import { tokens } from "../theme";
import React from "react";
import { Pool, Filter } from "../pools/page";

export const descriptionHeader = {
  color: "var(--content-medium-emphasis, rgba(255, 255, 255, 0.74))",
  marginTop: "3px",
  fontSize: {
    xs: "12px",
    md: "14px",
  },
  lineHeight: "140%",
};

export const descriptionContent = {
  color: "#FFF",
  fontSize: {
    xs: "12px",
    md: "18px",
  },
  fontWeight: 700,
  lineHeight: "140%",
  textAlign: "right",
};

const PoolItem = ({
  pool,
  onAddLiquidityClick,
  onShowDetailsClick,
  filter,
}: {
  pool: Pool;
  filter: Filter;
  onAddLiquidityClick: (pool: Pool) => void;
  onShowDetailsClick: (pool: Pool) => void;
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Grid item xs={6} md={3}>
      <Box
        sx={{
          padding: "16px",
          borderRadius: "8px",
          background: `${
            theme.palette.mode == "dark"
              ? `${colors.primary[400]}`
              : `${colors.primary[700]}`
          } !important`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "12px",
            marginLeft: "5px",
          }}
        >
          <Box
            component={"img"}
            src={pool.tokens[0].icon}
            sx={{
              width: {
                xs: "48px",
                md: "64px",
              },
            }}
          />
        </Box>
        <Typography
          sx={{
            textAlign: "center",
            marginBottom: "16px",
            fontWeight: 700,
            fontSize: {
              xs: "16px",
              md: "18px",
            },
          }}
        >
          {`${pool.tokens[0].name} `}
        </Typography>

        <Grid
          container
          rowSpacing={1}
          sx={{
            marginBottom: "24px",
          }}
        >
          <Grid item xs={6}>
            <Typography sx={descriptionHeader}>TVL</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={descriptionContent}>{pool.tvl}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={descriptionHeader}>Max APR</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={descriptionContent}>{pool.maxApr}</Typography>
          </Grid>
          <Grid item xs={6} display={filter == "MY" ? "block" : "none"}>
            <Typography sx={descriptionHeader}>My Liquidity</Typography>
          </Grid>
          <Grid item xs={6} display={filter == "MY" ? "block" : "none"}>
            <Typography sx={descriptionContent}>
              {pool.userLiquidity}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={12} md={7} sx={{}}>
            <Button
              onClick={() => onAddLiquidityClick(pool)}
              sx={{
                padding: "12px 16px",
                width: "170%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
              }}
              variant="contained"
              color="secondary"
            >
              Add Liquidity
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
export default PoolItem;
