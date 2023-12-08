import React from "react";
import {
  Box,
  Button as MuiButton,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { tokens } from "../theme";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { TokenBox } from "./TokenBox";
import { Token } from "./Token";
import { Button } from "./Button";

type Data = number[];

interface LabTabProps {
  tokenA: Token;
  tokenB: Token;
  liquidityA: number;
  liquidityB: number;
  liquidityToken: Token;
  onAddLiquidity: (tokenAAmount: number, tokenBAmount: number) => void;
  onRemoveLiquidity: (liquidityTokenAmount: number) => void;
}

const LabTabs = ({
  tokenA,
  tokenB,
  liquidityA,
  liquidityB,
  liquidityToken,
  onAddLiquidity,
  onRemoveLiquidity,
}: LabTabProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [value, setValue] = useState("1");
  const [tokenAValue, setTokenAValue] = useState<string | undefined>(undefined);
  const [tokenBValue, setTokenBValue] = useState<string | undefined>(undefined);
  const [tokenCValue, setTokenCValue] = useState<string | undefined>(undefined);

  const liquidityRatio = liquidityA / liquidityB;

  const keepRatioA = (val: string) => {
    setTokenAValue(val);

    const valB = Number(val) / liquidityRatio;
    setTokenBValue(valB.toFixed(4));
  };

  const keepRatioB = (val: string) => {
    setTokenBValue(val);

    const valA = Number(val) * liquidityRatio;
    setTokenAValue(valA.toFixed(4));
  };

  const buttonStyles = {
    display: "flex",
    height: "2.5rem",
    padding: "0rem 0.75rem",
    borderRadius: "0.5rem",
    textTransform: "none",
    color: "white",
    fontWeight: 700,
    fontSize: "0.875rem",
    background: "none",
    boxShadow: "none",
    "&:hover": {
      background: `${colors.greenAccent[600]}`,
      boxShadow: "none",
    },
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", mt: 2, p: "1.4rem" }}>
      <TabContext value={value}>
        <Box sx={{ display: "flex" }}>
          <MuiButton
            variant="contained"
            onClick={() => setValue("1")}
            sx={{
              ...buttonStyles,
              background: value === "1" ? `${colors.greenAccent[400]}` : "none",
            }}
          >
            Add liquidity
          </MuiButton>
          <MuiButton
            variant="contained"
            onClick={() => setValue("2")}
            sx={{
              ...buttonStyles,
              background: value === "2" ? `${colors.greenAccent[400]}` : "none",
              ml: 1,
            }}
          >
            Remove liquidity
          </MuiButton>
        </Box>
        <TabPanel sx={{ padding: "0", mt: "1rem" }} value="1">
          <TokenBox
            value={tokenAValue}
            onChange={val => keepRatioA(val)}
            token={tokenA}
            hideDropdownButton={true}
          />

          <Button
            onClick={() =>
              onAddLiquidity(Number(tokenAValue), Number(tokenBValue))
            }
            sx={{ mt: "0.5rem" }}
            fullWidth
            // @ts-ignore
            variant="secondary"
          >
            Add Liquidity
          </Button>
        </TabPanel>
        <TabPanel sx={{ padding: "0", mt: "1rem" }} value="2">
          <TokenBox
            onChange={val => setTokenCValue(val)}
            value={tokenCValue}
            token={liquidityToken}
            hideDropdownButton={true}
          />
          <Button
            onClick={() => onRemoveLiquidity(Number(tokenCValue))}
            sx={{ mt: "0.5rem" }}
            fullWidth
            // @ts-ignore
            variant="secondary"
          >
            Remove Liquidity
          </Button>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

interface PoolLiquidityProps {
  tokenA: Token;
  tokenB: Token;
  liquidityToken: Token;
  poolHistory: Data[];
  liquidityA: number;
  liquidityB: number;
  onAddLiquidity: (tokenAAmount: number, tokenBAmount: number) => void;
  onRemoveLiquidity: (liquidityTokenAmount: number) => void;
}

const PoolLiquidity = ({
  tokenA,
  tokenB,
  liquidityA,
  liquidityB,
  liquidityToken,
  poolHistory,
  onAddLiquidity,
  onRemoveLiquidity,
}: PoolLiquidityProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        borderRadius: "0.5rem",
        background: `${
          theme.palette.mode == "dark"
            ? `${colors.primary[400]}`
            : `${colors.primary[700]}`
        }`,
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ padding: "1.5rem" }}>
          <Box
            sx={{ height: "4rem", width: "4rem" }}
            component="img"
            src={tokenA?.icon}
          />
          <Box
            sx={{ ml: -1, height: "4rem", width: "4rem" }}
            component="img"
            src={tokenB?.icon}
          />
        </Box>
      </Box>
      <Divider />
      <Box>
        <Grid container>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography sx={{ fontSize: "0.875rem", opacity: 0.7 }}>
                  {tokenA?.name}
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "1.125rem" }}>
                  {liquidityA}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography sx={{ fontSize: "0.875rem", opacity: 0.7 }}>
                  {tokenB?.name}
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "1.125rem" }}>
                  {liquidityB}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <LabTabs
          tokenA={tokenA}
          tokenB={tokenB}
          liquidityA={liquidityA}
          liquidityB={liquidityB}
          liquidityToken={liquidityToken}
          onAddLiquidity={onAddLiquidity}
          onRemoveLiquidity={onRemoveLiquidity}
        />
      </Box>
    </Box>
  );
};

export default PoolLiquidity;
