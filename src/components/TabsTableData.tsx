"use client";
import { CONFIG_CONTRACT, ORACLE_CONFIG } from "@/app/helpers";
import Link from "next/link";
import { useReadContract } from "wagmi";
import { useEffect, useState } from "react";

export const TabsTableData = ({
  tabByte,
  tabName,
  tabLongName,
}: {
  tabByte: string;
  tabName: string;
  tabLongName: string;
}) => {
  const [medianValue, setMedianValue] = useState<number>();
  const reserve =
    "0x6588b8894fca8cf664a5104c02483d947c24df3a4f2069053c798bcba9b23870";
  const { data: reserveData }: { data: any } = useReadContract({
    ...CONFIG_CONTRACT,
    functionName: "reserveParams",
    args: [reserve],
  });

  const { data: tabData }: { data: any } = useReadContract({
    ...CONFIG_CONTRACT,
    functionName: "tabParams",
    args: [tabByte],
  });

  useEffect(() => {
    const fetchMedianValue = async () => {
      setMedianValue(10000);
      try {
        const apiUrl = "http://localhost:4545/median-price";

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const fullKey = `BTC${tabName}`;
        if (data.data.quotes[fullKey]) {
          setMedianValue(data.data.quotes[fullKey].median);
        } else {
          console.error(`Key ${fullKey} not found in the API response.`);
        }
      } catch (error) {
        console.error("Failed to fetch median value:", error);
      }
    };

    fetchMedianValue();
  }, [tabName]);

  return (
    <>
      <tr className="border-t-2">
        <td className="px-6 py-4">
          <div className="flex items-center gap-4">
            <img
              src={
                `/assets/TabsIcon/${tabName}.svg` || "/assets/TabsIcon/USD.svg"
              }
              className="w-6"
            />
            <p className="text-black">{tabLongName}</p>
          </div>
        </td>
        <td className="px-6 py-4">s{tabName}</td>
        <td className="px-6 py-4">
          {medianValue && (Number(medianValue) / 10 ** 18).toFixed(4)}
        </td>
        <td className="px-6 py-4">
          {reserveData && reserveData[1].toString()} %
        </td>
        <td className="px-6 py-4">
          {tabData && (Number(tabData[0]) / 100).toString()} % per day
        </td>
        <td className="px-6 py-4">
          {reserveData && reserveData[2].toString()} %
        </td>
        <td className="px-6 py-4">
          <Link
            href={"vault/create"}
            className="text-center w-100 text-black border-b-2 border-black"
          >
            Create vault
          </Link>
        </td>
      </tr>
    </>
  );
};
