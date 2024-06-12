import { useReadContract } from "wagmi";
import { TAB_REGISTRY_CONFIG } from "@/app/helpers";

function Tabs(arg: unknown) {
  const { data, error } = useReadContract({
    ...TAB_REGISTRY_CONFIG,
    functionName: "tab",
    args: [arg],
  });
  return data;
}
export default Tabs;
