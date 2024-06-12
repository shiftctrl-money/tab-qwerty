import { useReadContract } from "wagmi";
import { erc20Abi } from "viem";
function getTokenName(address: any) {
  const { data, error } = useReadContract({
    address: address,
    abi: erc20Abi,
    functionName: "symbol",
  });
  return data;
}
export default getTokenName;
