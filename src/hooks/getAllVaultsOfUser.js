
import { useReadContract } from 'wagmi'
import {VAULT_MANAGER_CONFIG} from "../app/helpers/index"
function getAllVaultIDByOwner(user) {
  const { data,error} = useReadContract({
    ...VAULT_MANAGER_CONFIG,
    functionName: 'getAllVaultIDByOwner',
    args:[user]
   
  })
console.log(data,error)
  return data
}
export default getAllVaultIDByOwner;    