import { useReadContract } from "wagmi";
import { VAULT_MANAGER_CONFIG } from "@/app/helpers";

type Vault = {
  reserveAddr: string;
  reserveAmt: bigint;
  tab: string;
  tabAmt: bigint;
  osTabAmt: bigint;
  pendingOsMint: bigint;
};

export default function getDetailedVaultData(user: any, id: any): Vault | null {
  const { data, error } = useReadContract({
    ...VAULT_MANAGER_CONFIG,
    functionName: "vaults",
    args: [user, id],
  });

  const { data: dummyData } = useReadContract({
    ...VAULT_MANAGER_CONFIG,
    functionName: "getVaultDetails",
    args: [user, id],
  });
  console.log(dummyData);

  if (error || !data) {
    return {
      reserveAddr: "",
      reserveAmt: BigInt(0),
      tab: "",
      tabAmt: BigInt(0),
      osTabAmt: BigInt(0),
      pendingOsMint: BigInt(0),
    };
  }

  const [reserveAddr, reserveAmt, tab, tabAmt, osTabAmt, pendingOsMint] =
    data as [string, bigint, string, bigint, bigint, bigint];

  const details: Vault = {
    reserveAddr,
    reserveAmt,
    tab,
    tabAmt,
    osTabAmt,
    pendingOsMint,
  };

  return details;
}
