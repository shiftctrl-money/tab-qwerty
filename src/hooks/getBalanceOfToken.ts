import { useReadContract } from "wagmi";
import { Address, erc20Abi, formatUnits } from "viem";

const getBalanceOfToken = (user_address: string, address: string) => {
  const { data } = useReadContract({
    abi: erc20Abi,
    functionName: "decimals",
    address: address as Address,
  });
  const { data: balance } = useReadContract({
    abi: erc20Abi,
    functionName: "balanceOf",
    address: address as Address,
    args: [user_address as Address],
  });
  if (!data || !balance) return null;
  return formatUnits(balance, data);
};

export default getBalanceOfToken;