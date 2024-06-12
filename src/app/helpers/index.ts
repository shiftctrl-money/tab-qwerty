import TabRegistryAbi from "./abi/TabRegistry.json";
import ProtocolVaultAbi from "./abi/ProtocolVault.json";
import VaultManagerAbi from "./abi/VaultManager.json";
import ConfigAbi from "./abi/Config.json";
import OracleAbi from "./abi/PriceOracle.json";
import VaultKeeper from "./abi/VaultKeeper.json";
import AuctionManager from "./abi/AuctionManager.json";
import { Address } from "viem";

export const VAULT_MANAGER_CONFIG = {
  abi: VaultManagerAbi,
  address: "0x4aEAe1e78fD0b7B329e5Ea808F124ca05Ca3BA00" as Address,
};

export const AUCTION_MANAGER_CONFIG = {
  abi: AuctionManager,
  address: "0x7f45645523112EF72343083EB6C228088367CA74" as Address,
};

export const VAULT_KEEPER_CONFIG = {
  abi: VaultKeeper,
  address: "0xae7a2C1eB2F7d9AFEEDCF1c850D97659087F38Ff" as Address,
};
export const PROTOCOL_VAULT_CONFIG = {
  abi: ProtocolVaultAbi,
  address: "0x67E332459A81F3d64142829541b6fec608356B63" as Address,
};
export const TAB_REGISTRY_CONFIG = {
  abi: TabRegistryAbi,
  address: "0x5B2949601CDD3721FF11bF55419F427c9C118e2c" as Address,
};

export const CONFIG_CONTRACT = {
  abi: ConfigAbi,
  address: "0x1a13d6a511A9551eC1A493C26362836e80aC4d65" as Address,
};

export const ORACLE_CONFIG = {
  abi: OracleAbi,
  address: "0x2595a9473DDae8632780ED755E49f74e4763b076" as Address,
};

export const TabCurrencies = [
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "GBP",
  "GEL",
  "GGP",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "IMP",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JEP",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KMF",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLL",
  "SOS",
  "SRD",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "UYU",
  "UZS",
  "VES",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XCD",
  "XDR",
  "XOF",
  "XPF",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL",
];

export function stringToBytes3(inputString: string): string {
  if (
    inputString.length !== 3 &&
    (inputString.length !== 4 || inputString.charAt(0) !== "s")
  ) {
    throw new Error(
      "Input string must be either exactly 3 characters long or start with 's'."
    );
  }
  const trimmedString = inputString.startsWith("s")
    ? inputString.slice(1)
    : inputString;

  const charCodes = trimmedString.split("").map((char) => char.charCodeAt(0));

  const hexString = charCodes
    .map((code) => code.toString(16).padStart(2, "0"))
    .join("");

  if (hexString.length !== 6) {
    throw new Error("Error converting string to bytes3.");
  }

  return `0x${hexString}`;
}

export function bytes3ToString(bytes3Hex: any) {
  if (bytes3Hex.startsWith("0x")) {
    bytes3Hex = bytes3Hex.slice(2);
  }
  // Split the hexadecimal string into pairs of characters (bytes)
  const pairs = bytes3Hex.match(/.{1,2}/g);

  // Convert each pair of characters to its corresponding byte
  const bytes = pairs.map((pair: string) => parseInt(pair, 16));

  // Convert bytes to string
  let result = "";
  for (let i = 0; i < bytes.length; i++) {
    result += String.fromCharCode(bytes[i]);
  }
  return result;
}
