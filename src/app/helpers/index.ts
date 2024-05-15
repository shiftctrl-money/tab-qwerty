import TabRegistryAbi from "./abi/TabRegistry.json";
import ProtocolVaultAbi from "./abi/ProtocolVault.json";
import VaultManagerAbi from "./abi/VaultManager.json";
import ConfigAbi from "./abi/Config.json";
import OracleAbi from "./abi/PriceOracle.json";

import { Address } from "viem";

export const VAULT_MANAGER_CONFIG = {
  abi: VaultManagerAbi,
  address: "0x3C827cA107951A9bEefb1F6B948d84D5e2838B6d" as Address,
};
export const PROTOCOL_VAULT_CONFIG = {
  abi: ProtocolVaultAbi,
  address: "0x30c61008d928C179cA51039708f413ce5e92B401" as Address,
};
export const TAB_REGISTRY_CONFIG = {
  abi: TabRegistryAbi,
  address: "0x768Dd788ae518790e1A9fcE92E2d0bbf4CedC686" as Address,
};

export const CONFIG_CONTRACT = {
  abi: ConfigAbi,
  address: "0x66E75f4ad4307367061F915A4BD35281d08855b0" as Address,
};

export const ORACLE_CONFIG = {
  abi: OracleAbi,
  address: "0x2595a9473DDae8632780ED755E49f74e4763b076" as Address,
};
