"use client";
import { VAULT_MANAGER_CONFIG, bytes3ToString } from "@/app/helpers";
import { AllTabs } from "@/app/helpers/tabs/AllTabs";
import { publicClient } from "@/utils/viemConfig";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { useAccount, useReadContract } from "wagmi";

type Vault = {
  tab: string;
  reserveKey: bigint;
  price: bigint;
  reserveAmt: bigint;
  osTab: bigint;
  reserveValue: bigint;
  minReserveValue: bigint;
};

export const PopularTabs = () => {
  const { address, isConnected } = useAccount();
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [topTabs, setTopTabs] = useState<string[]>([]);
  const getVaultDetails = async (
    user: Address | undefined,
    id: any
  ): Promise<Vault | null> => {
    const data: any = await publicClient.readContract({
      ...VAULT_MANAGER_CONFIG,
      functionName: "getVaultDetails",
      args: [user, id],
    });

    const [
      tab,
      reserveKey,
      price,
      reserveAmt,
      osTab,
      reserveValue,
      minReserveValue,
    ] = data as [string, bigint, bigint, bigint, bigint, bigint, bigint];

    return {
      tab,
      reserveKey,
      price,
      reserveAmt,
      osTab,
      reserveValue,
      minReserveValue,
    };
  };

  const getOwnerList = async (): Promise<Address[]> => {
    const owners = await publicClient.readContract({
      ...VAULT_MANAGER_CONFIG,
      functionName: "getOwnerList",
      args: [],
    });
    return owners as Address[];
  };

  const getVaultsOfAllUsers = async () => {
    const ownerList = await getOwnerList();
    const allVaults: Vault[] = [];

    for (const owner of ownerList) {
      const vaultIds: any = await publicClient.readContract({
        ...VAULT_MANAGER_CONFIG,
        functionName: "getAllVaultIDByOwner",
        args: [owner],
      });

      for (const id of vaultIds) {
        const vaultDetails = await getVaultDetails(owner, id);
        if (vaultDetails) {
          allVaults.push(vaultDetails);
        }
      }
    }

    setVaults(allVaults);
  };

  function getTabLongName(tabName: string): string | undefined {
    if (AllTabs.hasOwnProperty(tabName)) {
      return AllTabs[tabName].longName;
    }
  }

  useEffect(() => {
    getVaultsOfAllUsers();
  }, []);

  useEffect(() => {
    if (vaults.length > 0) {
      const tabCount: Record<string, number> = {};

      vaults.forEach((vault) => {
        if (vault.tab in tabCount) {
          tabCount[vault.tab]++;
        } else {
          tabCount[vault.tab] = 1;
        }
      });

      const sortedTabs = Object.keys(tabCount).sort(
        (a, b) => tabCount[b] - tabCount[a]
      );

      setTopTabs(sortedTabs.slice(0, 3));
    }
  }, [vaults]);

  const VaultCard = ({ tab }: { tab: string }) => (
    <div className="bg-white p-3 rounded-3xl">
      <div className="max-w-full">
        <div className="bg-[#FB5108] p-5 rounded-3xl">
          <div className="relative">
            <img src="/assets/SoundIcon.png" className="my-4" />
          </div>
          <p className="text-white text-3xl">s{bytes3ToString(tab)}</p>
          <div className="flex mt-2">
            <p className="text-white">{getTabLongName(bytes3ToString(tab))}</p>
          </div>
        </div>
        <div className="p-5">
          <div className="my-2">
            <p className="text-black text-sm">Min. reserve ratio</p>
            <p className="text-lg text-black font-medium">180% </p>
          </div>
          <div className="my-2">
            <p className="text-black text-sm">Risk penalty</p>
            <p className="text-lg text-black font-medium">2% per day </p>
          </div>
          <div className="my-2">
            <p className="text-black text-sm">Liquidation ratio</p>
            <p className="text-lg text-black font-medium">120% </p>
          </div>
          <div className="my-2">
            <p className="text-black text-sm">BTC price</p>
            <p className="text-lg text-black font-medium">100,000.1234 sUSD</p>
          </div>
          <div className="mt-8 mb-2 flex flex-col">
            <Link
              href={"/vault/create"}
              className="text-center w-100 bg-black text-white rounded-3xl py-3"
            >
              Create vault
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center p-12">
        {topTabs.map((tab) => (
          <VaultCard key={tab} tab={tab} />
        ))}
      </div>
    </>
  );
};
