import React, { useState } from "react";
import { TokenboundClient } from "@tokenbound/sdk";
import { Button, TextField, Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useWalletClient } from "wagmi";

const NFTWallet = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tokenBoundAccount, setTokenBoundAccount] =
    useState<TokenboundClient | null>(null);
  const [address, setAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const { data: walletClient } = useWalletClient();

  const handleFetchAccount = async () => {
    if (!walletClient) return;
    const tokenBoundClient = new TokenboundClient({ walletClient, chainId: 5 });
    const account = await tokenBoundClient.getAccount({
      tokenContract: address ? (`0x${address}` as `0x${string}`) : "",
      tokenId: tokenId,
    });
    setTokenBoundAccount(account);
  };
  return <div>NFTWallet</div>;
};

export default NFTWallet;
