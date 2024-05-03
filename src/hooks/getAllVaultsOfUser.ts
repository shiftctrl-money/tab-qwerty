import { useReadContract } from "wagmi";
import { VAULT_MANAGER_CONFIG } from "@/app/helpers";

function getAllVaultIDByOwner(user: any) {
  const { data } = useReadContract({
    ...VAULT_MANAGER_CONFIG,
    functionName: "getAllVaultIDByOwner",
    args: [user],
  });
  return data as [];
}
export default getAllVaultIDByOwner;