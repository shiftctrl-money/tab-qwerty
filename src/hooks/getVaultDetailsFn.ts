import { useReadContract } from "wagmi";
import { VAULT_MANAGER_CONFIG } from "@/app/helpers";
import { Address } from "viem";

type Vault = {
  tab: string;
  reserveKey: bigint;
  price: bigint;
  reserveAmt: bigint;
  osTab: bigint;
  reserveValue: bigint;
  minReserveValue: bigint;
};

export default function getVaultDetailsFn(
  user: Address | undefined,
  id: any
): Vault | null {
  const { data, error } = useReadContract({
    ...VAULT_MANAGER_CONFIG,
    functionName: "getVaultDetails",
    args: [user, id],
  });

  if (error || !data) {
    return {
      tab: "",
      reserveKey: BigInt(0),
      price: BigInt(0),
      reserveAmt: BigInt(0),
      osTab: BigInt(0),
      reserveValue: BigInt(0),
      minReserveValue: BigInt(0),
    };
  }

  const [
    tab,
    reserveKey,
    price,
    reserveAmt,
    osTab,
    reserveValue,
    minReserveValue,
  ] = data as [string, bigint, bigint, bigint, bigint, bigint, bigint];

  const details: Vault = {
    tab,
    reserveKey,
    price,
    reserveAmt,
    osTab,
    reserveValue,
    minReserveValue,
  };

  return details;
}
