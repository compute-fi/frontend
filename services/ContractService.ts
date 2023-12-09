import { ethers } from "ethers";
import { contracts, pool } from "../constants";
import {
  CompoundUSDTABI,
  CompoundDAIABI,
  CompoundETHABI,
  CompoundUNIABI,
  CompoundCOMPABI,
  LidoABI,
  WETHABI,
  ERC20ABI,
} from "../constants";
import AccountService from "./AccountService";

export const getPool = (poolName: string) => {
  return new ethers.Contract(
    contracts[poolName].address,
    contracts[poolName].abi,
    AccountService.getProvider()
  );
};

export const getToken = (tokenName: string) => {
  const token = pool.tokens.find(token => token.name === tokenName);
  const abi = tokenName === "WETH" ? WETHABI.abi : ERC20ABI;

  if (!token) {
    throw new Error(`Token ${tokenName} not found`);
  }

  return new ethers.Contract(token.address, abi, AccountService.getProvider());
};

export const getTokenBalance = async (tokenName: string) => {
  const token = getToken(tokenName);
  const signer = await AccountService.getSigner();
  const balance = await token.balanceOf(signer?.getAddress());
  return balance;
};

export const getContract = (contractName: string) => {
  const contract = contracts[contractName];
  if (!contract) {
    throw new Error(`Contract ${contractName} not found`);
  }
  return new ethers.Contract(
    contract.address,
    contract.abi,
    AccountService.getProvider()
  );
};

export const approveToken = async (
  tokenName: string,
  spender: string,
  amount: string
) => {
  const token = getToken(tokenName);
  const tx = await token.approve(spender, amount);
  return tx;
};
