
import { useReadContract } from 'wagmi'
import {TAB_REGISTRY_CONFIG} from "../app/helpers/index"
function Tabs(arg) {



  const { data,error} = useReadContract({
    ...TAB_REGISTRY_CONFIG,
    functionName: 'tab',
    args:[arg]
  })
console.log(data)
  return data
}
export default Tabs;