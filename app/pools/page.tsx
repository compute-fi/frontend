"use client";
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
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Header from "../components/Header";
import { tokens } from "../theme";
import React from "react";
import PoolItem from "../components/PoolItem";
import { pool } from "@/constants";
import PoolModal from "../components/PoolModal";

export interface Token {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>> | string | undefined | null;
  usdValue: number;
  amount: number;
  category: string;
  address: string;
  tvl: string;
  maxApr: string;
  userLiquidity: number;
}

export interface Pool {
  tokens: Token[];
  tvl: string;
  maxApr: string;
  userLiquidity: number;
  poolAddress: string;
}

export type Sort = "HighTVL" | "HighAPR" | "LowTVL" | "LowAPR";
export type Filter = "ALL" | "MY";

interface PoolsProps {
  pools: Pool[];
  onAddLiquidityClick: (token: Token) => void;
  filter: Filter;
  sort: Sort;
  onSortSelect: (by: Sort) => void;
  onFilterClick: (by: Filter) => void;
}

// const pool = {
//   tokens: [
//     {
//       name: "USDT",
//       icon: "./cTokenUSDT.svg",
//       usdValue: 0.0,
//       amount: 0.0,
//       category: "USDT",
//     },
//     {
//       name: "ETH",
//       icon: "./eth.png",
//       usdValue: 0.0,
//       amount: 0.0,
//       category: "ETH",
//     },
//   ],
//   tvl: "$0.00",
//   maxApr: "0.00%",
//   userLiquidity: 0.0,
//   poolAddress: "",
// };

const FilterButton = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Button
      onClick={onClick}
      sx={{
        borderRadius: "16px",
        border: selected ? "1px solid #e24911a" : "none",
        background: selected
          ? "rgba(226, 73, 26, 0.10)"
          : "linear-gradient(180deg, rgba(255,255,255, 0.05) 0%, rgba(255,255,255, 0.03) 100%)",
        color: "white",
        padding: selected ? "7px 15px" : "8px 16px",
      }}
    >
      <Typography
        sx={{
          fontSize: "10px",
          fontWeight: 700,
          lineHeight: "20px",
        }}
      >
        {label}
      </Typography>
    </Button>
  );
};

const Pools = ({ filter, sort, onSortSelect, onFilterClick }: PoolsProps) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const onAddLiquidityClick = (token: Token) => {
    setOpen(true);
  };

  return (
    <Box m="20px">
      <Header title="POOLS" subtitle="Earn by providing liquidity" />

      <Box sx={{ flex: 1 }}>
        <Grid
          container
          spacing={1}
          sx={{
            marginBottom: "24px",
          }}
        >
          <Grid item>
            <FilterButton
              onClick={() => onFilterClick("ALL")}
              label="All Pools"
              selected={filter == "ALL"}
            />
          </Grid>
          <Grid item>
            <FilterButton
              onClick={() => onFilterClick("MY")}
              label="My Pools"
              selected={filter == "MY"}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={7} md={10}>
            <Input
              placeholder="Search"
              onChange={(e: any) => setSearchValue(e.target.value)}
              sx={{
                width: "100%",
                borderRadius: "16px",
                border: `1px solid ${
                  theme.palette.mode == "dark"
                    ? `${colors.blueAccent[500]}`
                    : `${colors.primary[500]}`
                }`,
                background: `${
                  theme.palette.mode == "dark"
                    ? `${colors.primary[500]}`
                    : `${colors.primary[400]}`
                }`,
                padding: "8px 16px",
                lineHeight: "18px",
                fontSize: "13px",
                marginBottom: "16px",
                "&:before": {
                  content: "none",
                },
                "&:after": {
                  content: "none",
                },
              }}
              startAdornment={
                <img style={{ marginRight: "8px" }} src="./search.svg" />
              }
            />
          </Grid>
          <Grid item xs={5} md={2}>
            <FormControl fullWidth>
              <InputLabel
                sx={{
                  fontSize: "13px !important",
                  paddingBottom: "12px",
                  color: `${
                    theme.palette.mode == "dark"
                      ? `${colors.primary[100]}`
                      : `${colors.primary[100]}`
                  }`,
                  borderColor: "transparent",
                  "&:hover": {
                    borderColor: "transparent",
                  },
                }}
              >
                Sort by
              </InputLabel>
              <Select
                onChange={(event: any) => onSortSelect(event.target.value)}
                autoWidth
                label="Sort by"
                value={sort}
                sx={{
                  padding: "16px",
                  height: "46px",
                  borderRadius: "16px",
                  border: `1px solid ${
                    theme.palette.mode == "dark"
                      ? `${colors.blueAccent[500]}`
                      : `${colors.primary[500]}`
                  }`,
                  background: `${
                    theme.palette.mode == "dark"
                      ? `${colors.primary[500]}`
                      : `${colors.primary[400]}`
                  }`,
                  fontSize: "14px",
                }}
              >
                <MenuItem defaultValue={"HighTVL"}>
                  <Typography fontSize="14px">TVL High to Low</Typography>
                </MenuItem>
                <MenuItem value={"HighTVL"}>
                  <Typography fontSize="14px">TVL Low to High</Typography>
                </MenuItem>
                <MenuItem value={"HighAPR"}>
                  <Typography fontSize="14px">APR High to Low</Typography>
                </MenuItem>
                <MenuItem value={"HighAPR"}>
                  <Typography fontSize="14px">APR Low to High</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {pool?.tokens?.map(token => (
            <PoolItem
              key={token.address}
              filter={filter}
              onAddLiquidityClick={onAddLiquidityClick}
              token={token}
            />
          ))}
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            sx={{
              "& .MuiDialog-paper": {
                background: `${
                  theme.palette.mode == "dark"
                    ? `${colors.primary[600]}`
                    : `${colors.primary[700]}`
                }`,
              },
            }}
          >
            <DialogContent>
              <PoolModal />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpen(false)}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Box>
    </Box>
  );
};

export default Pools;
