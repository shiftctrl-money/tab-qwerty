import TabRegistryAbi from "./abi/TabRegistry.json";
import ProtocolVaultAbi from "./abi/ProtocolVault.json";
import VaultManagerAbi from "./abi/VaultManager.json";
import ConfigAbi from "./abi/Config.json";
import OracleAbi from "./abi/PriceOracle.json";

import { Address } from "viem";

export const VAULT_MANAGER_CONFIG = {
  abi: VaultManagerAbi,
  address: "0x837A1de882cd8ebe58bBB9E796D7c669EBc77e1d" as Address,
};
export const PROTOCOL_VAULT_CONFIG = {
  abi: ProtocolVaultAbi,
  address: "0x15e7eB403b0Cf495e3e1FD48A65461bD4C6EBa24" as Address,
};
export const TAB_REGISTRY_CONFIG = {
  abi: TabRegistryAbi,
  address: "0xb942502390D433745158BD213983b37d005f9f43" as Address,
};

export const CONFIG_CONTRACT = {
  abi: ConfigAbi,
  address: "0x6FB640d044Fb226153D62288fC3346e6E6c491C1" as Address,
};

export const ORACLE_CONFIG = {
  abi: OracleAbi,
  address: "0x1024dd01BF5E86074887050E1b7DDa07bD3288Fc" as Address,
};