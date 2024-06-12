import { useReadContract } from "wagmi";
import { VAULT_MANAGER_CONFIG } from "../app/helpers/index";
function getVaultData(user: any, id: any) {
  const { data } = useReadContract({
    ...VAULT_MANAGER_CONFIG,
    functionName: "vaults",
    args: [user, id],
  });
  return data;
}
export default getVaultData;
