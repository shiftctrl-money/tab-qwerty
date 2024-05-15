import { useReadContract } from "wagmi";
import { CONFIG_CONTRACT } from "@/app/helpers";

type ReserveParams = {
  processFeeRate: string;
  minReserveRatio: bigint;
  liquidationRatio: bigint;
};

export default function getReserveParams(
  reserveKey: string
): ReserveParams | null {
  const { data, error } = useReadContract({
    ...CONFIG_CONTRACT,
    functionName: "reserveParams",
    args: [reserveKey],
  });

  if (error || !data) {
    return {
      processFeeRate: "",
      minReserveRatio: BigInt(0),
      liquidationRatio: BigInt(0),
    };
  }

  const [processFeeRate, minReserveRatio, liquidationRatio] = data as [
    string,
    bigint,
    bigint
  ];

  const details: ReserveParams = {
    processFeeRate,
    minReserveRatio,
    liquidationRatio,
  };

  return details;
}
