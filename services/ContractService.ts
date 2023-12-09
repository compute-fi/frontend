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

export const getTokenBalance = async (account: string, tokenName: string) => {
  const token = getToken(tokenName);
  const signer = await AccountService.getSigner();
  const balance = await token.balanceOf(signer?.getAddress());
  return ethers.formatEther(balance);
};

export const getContract = (tokenName: string) => {
  const token = pool.tokens.find(token => token.name === tokenName);

  if (!token) {
    throw new Error(`Contract ${tokenName} not found`);
  }

  const contractName = Object.keys(contracts).find(
    contract => contracts[contract].address === token.address
  );

  if (!contractName) {
    throw new Error(`Contract ${tokenName} not found`);
  }

  return contractName;
};

export const approveToken = async (
  tokenName: string,
  spender: string,
  amount: string
) => {
  const token = getToken(tokenName);
  const spenderContract = getContract(spender);
  const tx = await token.approve(spenderContract, amount);
  return tx;
};

export const getAllowance = async (
  tokenName: string,
  spender: string,
  owner: string
) => {
  const token = getToken(tokenName);
  const spenderContract = getContract(spender);
  const allowance = await token.allowance(owner, spenderContract);
  return allowance;
};

export const getTokenDecimals = async (tokenName: string) => {
  const token = getToken(tokenName);
  const decimals = await token.decimals();
  return decimals;
};

export const depositToken = async (
  account: string,
  tokenName: string,
  amount: ethers.BigNumberish,
  contract: string
) => {
  let token = getToken(tokenName);
  let contractName = getContract(contract);

  if (!contractName || !token) {
    throw new Error("Contract or token not found");
  }

  contractName.deposit(amount, account);
};
