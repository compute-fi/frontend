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

// Map token names from pool to contract names
const tokenToContractMapping: Record<string, any> = {
  USDT: "compoundUSDT",
  DAI: "compoundDAI",
  ETH: "compoundETH",
  UNI: "compoundUNI",
  COMP: "compoundCOMP",
  stETH: "lido",
};

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

export const getEthTokenBalance = async (account: string) => {
  const provider = AccountService.getProvider();
  const balance = await provider.getBalance(account);
  return ethers.formatEther(balance);
};

export const getEthContractBalance = async (account: string) => {
  const contract = getContract("stETH");
  console.log(contract);
  const contractInstance = new ethers.Contract(
    contract.address,
    contract.abi,
    AccountService.getProvider()
  );
  const balance = await contractInstance.balanceOf(account);
  return ethers.formatEther(balance);
};

export const getTokenBalance = async (account: string, tokenName: string) => {
  const token = getToken(tokenName);
  const signer = await AccountService.getSigner();
  const balance = await token.balanceOf(signer?.getAddress());
  return ethers.formatEther(balance);
};

export const getContract = (tokenName: string) => {
  const contractName = tokenToContractMapping[tokenName];

  if (!contractName) {
    throw new Error(`Contract ${tokenName} not found`);
  }

  const selectedContract = contracts[contractName];

  if (!selectedContract) {
    throw new Error(`Contract ${tokenName} not found`);
  }

  return selectedContract;
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
  const allowance = await token.allowance(owner, spenderContract.address);
  return allowance;
};

export const getTokenDecimals = async (tokenName: string) => {
  const token = getToken(tokenName);
  const decimals = await token.decimals();
  return decimals;
};

export const depositToken = async (
  tokenName: string,
  amount: string,
  address: string
) => {
  const selectedToken = getToken(tokenName);

  if (!selectedToken) {
    throw new Error(`Token ${tokenName} not found`);
  }

  const contract = getContract(tokenName);

  if (!contract) {
    throw new Error(`Contract ${tokenName} not found`);
  }

  const contractInstance = new ethers.Contract(
    contract.address,
    contract.abi,
    AccountService.getProvider()
  );

  const tx = await contractInstance.deposit(amount, address);
  return tx;
};

export const depositEth = async (amount: string, address: string) => {
  const contract = getContract("stETH");

  if (!contract) {
    throw new Error(`Contract ETH not found`);
  }

  const contractInstance = new ethers.Contract(
    contract.address,
    contract.abi,
    await AccountService.getSigner()
  );

  const tx = await contractInstance.depositETH(address, {
    value: ethers.parseEther(amount),
  });
  return tx;
};
