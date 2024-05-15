import { useReadContract } from "wagmi";
import { CONFIG_CONTRACT } from "@/app/helpers";

type TabParams = {
  riskPenaltyPerFrame: bigint;
  processFeeRate: bigint;
};

export default function getTabParams(tabKey: string): TabParams | null {
  const { data, error } = useReadContract({
    ...CONFIG_CONTRACT,
    functionName: "tabParams",
    args: [tabKey],
  });

  if (error || !data) {
    return {
      riskPenaltyPerFrame: BigInt(0),
      processFeeRate: BigInt(0),
    };
  }

  const [riskPenaltyPerFrame, processFeeRate] = data as [bigint, bigint];

  const details: TabParams = {
    riskPenaltyPerFrame,
    processFeeRate,
  };

  return details;
}
