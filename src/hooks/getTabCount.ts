import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { TAB_REGISTRY_CONFIG } from "../app/helpers/index";
import { ethers } from "ethers";

export const useTabCount = () => {
  const [tabList, setTabList] = useState<string[]>([]);
  const { data: activatedTabs, error } = useReadContract({
    ...TAB_REGISTRY_CONFIG,
    functionName: "activatedTabCount",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          "https://sepolia-rollup.arbitrum.io/rpc"
        );
        const tabContract = new ethers.Contract(
          TAB_REGISTRY_CONFIG.address,
          TAB_REGISTRY_CONFIG.abi,
          provider
        );

        const tabs: string[] = [];
        if (activatedTabs) {
          for (let i = 0; i < Number(activatedTabs); i++) {
            let tab = await tabContract.tabList(i);
            tabs.push(tab);
          }
        }
        setTabList(tabs);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [activatedTabs]);

  return { tabList, error };
};