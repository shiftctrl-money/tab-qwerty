
import { useReadContract } from 'wagmi'
import {VAULT_MANAGER_CONFIG} from "../app/helpers/index"
function getVaultData(user,id) {


    const { data,error} = useReadContract({
        ...VAULT_MANAGER_CONFIG,
        functionName: 'vaults',
        args:[user,id]
       
      })
    
    console.log(data,error)


  return data
}
export default getVaultData;    