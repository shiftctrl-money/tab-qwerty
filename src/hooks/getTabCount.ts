import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { TAB_REGISTRY_CONFIG } from "../app/helpers/index";
import { ethers } from "ethers";

export const useTabCount = () => {
  const [tabList, setTabList] = useState<string[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const { data: activatedTabs, error } = useReadContract({
    ...TAB_REGISTRY_CONFIG,
    functionName: "activatedTabCount",
  });
  const AlchemyKey = process.env.ALCHEMY_KEY;

  useEffect(() => {
    async function fetchData() {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          // `https://arb-sepolia.g.alchemy.com/v2/${AlchemyKey}`
          `http://127.0.0.1:8545`
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
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error(err);
        setLoading(false); // Set loading to false in case of error
      }
    }

    fetchData();
  }, [activatedTabs]);
  return { tabList, loading, error }; // Return loading state along with data and error
};
