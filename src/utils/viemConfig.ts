import {
  Address,
  createPublicClient,
  createWalletClient,
  custom,
  http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: arbitrumSepolia,
  transport: custom(window.ethereum),
});

const privateKey = process.env.VAULT_MANAGER_UI_PVT_KEY;
export const account = privateKeyToAccount(
  "0x7b1f7e2a2ebc4a2b250801dc540dbee865acf52688ef10187ddaa64f9c93d737"
);
