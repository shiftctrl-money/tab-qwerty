import { useReadContract } from "wagmi";
import { Address, erc20Abi, parseUnits } from "viem";

const getAmountOut = (address: string, amount: string) => {
  const { data } = useReadContract({
    abi: erc20Abi,
    functionName: "decimals",
    address: address as Address,
  });
  if (!data) return 0;
  return parseUnits(amount, data);
};

export default getAmountOut;
