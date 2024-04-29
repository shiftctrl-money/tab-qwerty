
import { useReadContract } from 'wagmi'
import {VAULT_MANAGER_CONFIG} from "../app/helpers/index"
import { erc20Abi } from 'viem'
function getTokenName(address) {


    const { data,error} = useReadContract({
        address:address ,
        abi:erc20Abi,
        functionName: 'symbol',
      })
    
    console.log(data,error)


  return data
}
export default getTokenName;    