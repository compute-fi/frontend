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
// import { Token } from "./Token";
import { Token } from "../pools/page";
import { Button } from "./Button";
import Image from "next/image";
import { useAccount } from "wagmi";
import {
  depositToken,
  getAllowance,
  approveToken,
  getToken,
  getTokenDecimals,
} from "@/services/ContractService";
import { contracts } from "@/constants";
import { ethers } from "ethers";
import { getContract } from "viem";

type Data = number[];

interface LabTabProps {
  token: Token;
  liquidityToken: number;
  onAddLiquidity: (tokenAmount: number) => void;
  onRemoveLiquidity: (liquidityTokenAmount: number) => void;
}

const LabTabs = ({
  token,
  liquidityToken,
  onAddLiquidity,
  onRemoveLiquidity,
}: LabTabProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { address } = useAccount();
  const [value, setValue] = useState("1");
  const [tokenValue, setTokenValue] = useState<string | undefined>(undefined);

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
    width: "200px",
  };

  const handleAddLiquidity = async (tokenAmount: number) => {
    try {
      const contractName = token.name;
      console.log("contractName", contractName);
      const spenderAddress = contracts[contractName].address;
      console.log("spenderAddress", spenderAddress);
      const tokenDecimals = await getTokenDecimals(token.name);
      console.log("tokenDecimals", tokenDecimals);
      const amountToDeposit = ethers.parseUnits(
        tokenAmount.toString(),
        tokenDecimals
      );
      console.log("amountToDeposit", amountToDeposit);

      if (!address) return;
      const allowance = await getAllowance(token.name, spenderAddress, address);
      if (allowance.lt(amountToDeposit)) {
        await approveToken(
          token.name,
          spenderAddress,
          amountToDeposit.toString()
        );
      }
      await depositToken(
        address,
        token.name,
        amountToDeposit.toString(),
        contractName
      );
    } catch (error) {
      console.error("Error depositing token", error);
    }
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
            value={tokenValue}
            onChange={() => {}}
            token={token}
            hideDropdownButton={true}
          />

          <Button
            onClick={() => handleAddLiquidity(Number(tokenValue))}
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
            onChange={() => {}}
            value={tokenValue}
            token={token}
            hideDropdownButton={true}
          />
          <Button
            onClick={() => onRemoveLiquidity(Number(tokenValue))}
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
  token: Token;
  liquidityToken: number;
  balance: string | number;
  onAddLiquidity: (tokenAmount: number) => void;
  onRemoveLiquidity: (liquidityTokenAmount: number) => void;
}

const PoolModal = ({
  token,
  liquidityToken,
  balance,
  onAddLiquidity,
  onRemoveLiquidity,
}: PoolLiquidityProps) => {
  const { address } = useAccount();
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
          <Image
            src={token?.icon as string}
            width={50}
            height={50}
            alt={token?.name}
          />
        </Box>
      </Box>
      <Divider />
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <Box
              sx={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    opacity: 0.7,
                  }}
                >
                  {token?.name}
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "1.125rem" }}>
                  {typeof balance === "number"
                    ? balance.toFixed(2)
                    : "Loading..."}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <LabTabs
          token={token}
          liquidityToken={liquidityToken}
          onAddLiquidity={onAddLiquidity}
          onRemoveLiquidity={onRemoveLiquidity}
        />
      </Box>
    </Box>
  );
};

export default PoolModal;
