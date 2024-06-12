"use client";
import React from "react";
import getTokenName from "../../../hooks/getTokenName";
import { Tooltip } from "flowbite-react";
import Link from "next/link";
import { formatEther } from "viem";
import { AllTabs } from "@/app/helpers/tabs/AllTabs";
import getDetailedVaultData from "@/hooks/getDetailedVaultData";
import { customTollTipTheme } from "@/theme/CustomToolTipTheme";
import getVaultDetailsFn from "@/hooks/getVaultDetailsFn";

type Vault = {
  reserveAddr: string;
  reserveAmt: bigint;
  tab: string;
  tabAmt: bigint;
  osTabAmt: bigint;
  pendingOsMint: bigint;
};

export const ListItem = ({
  address,
  id,
  showWarning,
}: {
  address: any;
  id: any;
  showWarning: boolean;
}) => {
  const data: Vault | null = getDetailedVaultData(address, id);
  const fnData = getVaultDetailsFn(address, id);

  const tokenName = getTokenName(data ? data.tab : 0);

  const removeSPrefix = (symbol: string) => {
    return symbol.slice(1);
  };

  function getTabLongName(tabName: string): string | undefined {
    const tab = removeSPrefix(tabName || "sUSD");
    if (AllTabs.hasOwnProperty(tab)) {
      return AllTabs[tab].longName;
    }
  }

  const reserveRatio = Number(VaultReserveRatio());

  function calcLiqPrice() {
    const reserveValue = (Number(data?.tabAmt) * 120) / 100;
    const liQuidationPrice = reserveValue / Number(data?.reserveAmt);
    return liQuidationPrice;
  }

  function VaultReserveRatio() {
    const reserVal = Number(fnData?.reserveValue) / 10 ** 18;
    const osVal = Number(fnData?.osTab) / 10 ** 18;
    const reserveR = (reserVal / osVal) * 100;
    return reserveR.toFixed(2);
  }

  if (!data) return <></>;
  return (
    <>
      {showWarning && reserveRatio < 270 && (
        <tr
          className={` ${
            reserveRatio < 270
              ? "bg-[#FFEDEB]"
              : "odd:bg-[#F9F9F9] even:bg-white"
          }`}
        >
          <td className="px-6 py-4">
            <Link href={"/vault/" + Number(id)}>
              <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                <p className="mx-auto text-center text-black">#{Number(id)}</p>
              </div>
            </Link>
          </td>
          <td className="px-6 py-4">{getTabLongName(tokenName || "sUSD")}</td>
          <td className="px-6 py-4">
            <div className="flex">
              <p>{reserveRatio}%</p>
              {reserveRatio < 270 && (
                <div>
                  <Tooltip
                    theme={customTollTipTheme}
                    placement="bottom"
                    style="light"
                    content="The Reserve Ratio is at risk of falling below the minimum required level. Please deposit more reserves or reduce the Outstanding Tabs by burning Tabs. We recommend a Reserve Ratio above 270%."
                  >
                    <img
                      className="mx-2"
                      src="/icons/Error.png"
                      width={20}
                      height={20}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
          </td>
          <td className="px-6 py-4">
            {calcLiqPrice().toFixed(4)} {tokenName}
          </td>
          <td className="px-6 py-4">
            {Number(fnData?.osTab) / 10 ** 18} {tokenName}
          </td>
          <td className="px-6 py-4">{formatEther(data.reserveAmt)} cBTC</td>
        </tr>
      )}
      {!showWarning ||
        (reserveRatio >= 270 && (
          <tr
            className={` ${
              reserveRatio < 270
                ? "bg-[#FFEDEB]"
                : "odd:bg-[#F9F9F9] even:bg-white"
            }`}
          >
            <td className="px-6 py-4">
              <Link href={"/vault/" + Number(id)}>
                <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                  <p className="mx-auto text-center text-black">
                    #{Number(id)}
                  </p>
                </div>
              </Link>
            </td>
            <td className="px-6 py-4">{getTabLongName(tokenName || "sUSD")}</td>
            <td className="px-6 py-4">
              <div className="flex">
                <p>{reserveRatio}%</p>
                {reserveRatio < 270 && (
                  <div>
                    <Tooltip
                      theme={customTollTipTheme}
                      placement="bottom"
                      style="light"
                      content="The Reserve Ratio is at risk of falling below the minimum required level. Please deposit more reserves or reduce the Outstanding Tabs by burning Tabs. We recommend a Reserve Ratio above 270%."
                    >
                      <img
                        className="mx-2"
                        src="/icons/Error.png"
                        width={20}
                        height={20}
                      />
                    </Tooltip>
                  </div>
                )}
              </div>
            </td>
            <td className="px-6 py-4">
              {calcLiqPrice().toFixed(4)} {tokenName}
            </td>
            <td className="px-6 py-4">
              {Number(fnData?.osTab) / 10 ** 18} {tokenName}
            </td>
            <td className="px-6 py-4">{formatEther(data.reserveAmt)} cBTC</td>
          </tr>
        ))}
    </>
  );
};
