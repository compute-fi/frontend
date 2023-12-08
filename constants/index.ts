import React from "react";

import {
  cTokenUsdt,
  cTokenComp,
  cTokenEth,
  cTokenDai,
  cTokenUni,
  stEth,
} from "../public/assets";

export type TokenType = {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>> | string | undefined | null;
  usdValue: number;
  amount: number;
  category: string;
  address: string;
  tvl: string;
  maxApr: string;
  userLiquidity: number;
};

export type PoolType = {
  tokens: TokenType[];
};

export const pool: PoolType = {
  tokens: [
    {
      name: "USDT",
      icon: cTokenUsdt,
      usdValue: 1.0,
      amount: 0.0,
      category: "USDT",
      address: "0x79C950C7446B234a6Ad53B908fBF342b01c4d446",
      tvl: "$0.00",
      maxApr: "0.00%",
      userLiquidity: 0.0,
    },
    {
      name: "COMP",
      icon: cTokenComp,
      usdValue: 0.0,
      amount: 0.0,
      category: "COMP",
      address: "0x3587b2F7E0E2D6166d6C14230e7Fe160252B0ba4",
      tvl: "$0.00",
      maxApr: "0.00%",
      userLiquidity: 0.0,
    },
    {
      name: "ETH",
      icon: cTokenEth,
      usdValue: 0.0,
      amount: 0.0,
      category: "ETH",
      address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
      tvl: "$0.00",
      maxApr: "0.00%",
      userLiquidity: 0.0,
    },
    {
      name: "DAI",
      icon: cTokenDai,
      usdValue: 1.0,
      amount: 0.0,
      category: "DAI",
      address: "0x2899a03ffDab5C90BADc5920b4f53B0884EB13cC",
      tvl: "$0.00",
      maxApr: "0.00%",
      userLiquidity: 0.0,
    },
    {
      name: "UNI",
      icon: cTokenUni,
      usdValue: 0.0,
      amount: 0.0,
      category: "UNI",
      address: "0x208F73527727bcB2D9ca9bA047E3979559EB08cC",
      tvl: "$0.00",
      maxApr: "0.00%",
      userLiquidity: 0.0,
    },
    {
      name: "stETH",
      icon: stEth,
      usdValue: 0.0,
      amount: 0.0,
      category: "stETH",
      address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
      tvl: "$0.00",
      maxApr: "0.00%",
      userLiquidity: 0.0,
    },
  ],
};
