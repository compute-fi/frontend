import React from "react";
import CompoundUSDTArtifact from "@/abis/compoundUSDT.json";
import CompoundDAIArtifact from "@/abis/compoundDAI.json";
import CompoundETHArtifact from "@/abis/compoundETH.json";
import CompoundUNIArtifact from "@/abis/compoundUNI.json";
import CompoundCOMPArtifact from "@/abis/compoundCOMP.json";
import LidoArtifact from "@/abis/lido.json";
import ERC20ABI from "@/abis/ERC20.json";
import WETHABI from "@/abis/WETH.json";
export { default as CompoundUSDTABI } from "@/abis/compoundUSDT.json";
export { default as CompoundDAIABI } from "@/abis/compoundDAI.json";
export { default as CompoundETHABI } from "@/abis/compoundETH.json";
export { default as CompoundUNIABI } from "@/abis/compoundUNI.json";
export { default as CompoundCOMPABI } from "@/abis/compoundCOMP.json";
export { default as LidoABI } from "@/abis/lido.json";
export { default as WETHABI } from "@/abis/WETH.json";
export { default as ERC20ABI } from "@/abis/ERC20.json";

import {
  cTokenUsdt,
  cTokenComp,
  cTokenEth,
  cTokenDai,
  cTokenUni,
  stEth,
} from "../public/assets";
import { ethers } from "ethers";

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
  maxAllowance?: string;
  abi?: any;
  balances?: number | string;
  contractName?: string;
};

export type PoolType = {
  tokens: TokenType[];
};

type contractType = {
  [key: string]: {
    address: string;
    abi: any;
  };
};

export const pool: PoolType = {
  tokens: [
    {
      name: "USDT",
      icon: cTokenUsdt,
      usdValue: 0.0,
      amount: 0.0,
      category: "USDT",
      address: "0x79C950C7446B234a6Ad53B908fBF342b01c4d446",
      tvl: "$0.00",
      maxApr: "391.82%",
      userLiquidity: 0.0,
      maxAllowance:
        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
      abi: ERC20ABI,
    },
    {
      name: "COMP",
      icon: cTokenComp,
      usdValue: 0.0,
      amount: 0.0,
      category: "COMP",
      address: "0x3587b2F7E0E2D6166d6C14230e7Fe160252B0ba4",
      tvl: "$0.00",
      maxApr: "58.50%",
      userLiquidity: 0.0,
      maxAllowance:
        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
      abi: ERC20ABI,
    },
    {
      name: "ETH",
      icon: cTokenEth,
      usdValue: 0.0,
      amount: 0.0,
      category: "ETH",
      address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
      tvl: "$0.00",
      maxApr: "13.24%",
      userLiquidity: 0.0,
      maxAllowance:
        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
      abi: WETHABI,
    },
    {
      name: "DAI",
      icon: cTokenDai,
      usdValue: 1.0,
      amount: 0.0,
      category: "DAI",
      address: "0x2899a03ffDab5C90BADc5920b4f53B0884EB13cC",
      tvl: "$0.00",
      maxApr: "287.17%",
      userLiquidity: 0.0,
      maxAllowance:
        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
      abi: ERC20ABI,
    },
    {
      name: "UNI",
      icon: cTokenUni,
      usdValue: 0.0,
      amount: 0.0,
      category: "UNI",
      address: "0x208F73527727bcB2D9ca9bA047E3979559EB08cC",
      tvl: "$0.00",
      maxApr: "5696.07%",
      userLiquidity: 0.0,
      maxAllowance:
        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
      abi: ERC20ABI,
    },
    {
      name: "stETH",
      icon: stEth,
      usdValue: 0.0,
      amount: 0.0,
      category: "stETH",
      address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
      tvl: "$0.00",
      maxApr: "8.00%",
      userLiquidity: 0.0,
      maxAllowance:
        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
      abi: WETHABI,
    },
  ],
};

export const contracts: contractType = {
  compoundUSDT: {
    address: "0xe4e0956B7445E9942E71FEc7C6B2031ba9396b36",
    abi: CompoundUSDTArtifact.abi,
  },
  compoundDAI: {
    address: "0x6305D8005ea58F59465Af461b2340A7A546cB647",
    abi: CompoundDAIArtifact.abi,
  },
  compoundUNI: {
    address: "0x0e4875d8685640BB43DEFEaf52E114FCE2176521",
    abi: CompoundUNIArtifact.abi,
  },
  compoundETH: {
    address: "0xc208fD2512C7C7823e2aAC1Dd2Cf13Ad5B51BCF6",
    abi: CompoundETHArtifact.abi,
  },
  compoundCOMP: {
    address: "0x6AfBF3Ff3118Ce00F2a5DA16A01E8aedF3B6AAE0",
    abi: CompoundCOMPArtifact.abi,
  },
  lido: {
    address: "0x01DC8c3212291ca387406968cC9b549c523A0738",
    abi: LidoArtifact.abi,
  },
};

// export const GAS_LIMIT = ethers.hexlify("1_000_000");
