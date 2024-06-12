"use client";
import {
  AUCTION_MANAGER_CONFIG,
  CONFIG_CONTRACT,
  ORACLE_CONFIG,
  PROTOCOL_VAULT_CONFIG,
  TAB_REGISTRY_CONFIG,
  VAULT_KEEPER_CONFIG,
  VAULT_MANAGER_CONFIG,
  stringToBytes3,
} from "@/app/helpers";
import getDetailedVaultData from "@/hooks/getDetailedVaultData";
import getReserveParams from "@/hooks/getReserveParams";
import getTabParams from "@/hooks/getTabParams";
import getTokenName from "@/hooks/getTokenName";
import getVaultDetailsFn from "@/hooks/getVaultDetailsFn";
import { customTabTheme, dpCustomTheme } from "@/theme/CustomTabTheme";
import { publicClient } from "@/utils/viemConfig";
import { Datepicker, Tabs } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Address, formatEther } from "viem";
import { useAccount, useReadContract } from "wagmi";

type Vault = {
  reserveAddr: string;
  reserveAmt: bigint;
  tab: string;
  tabAmt: bigint;
  osTabAmt: bigint;
  pendingOsMint: bigint;
};

export default function SingleVault({ params }: { params: any }) {
  let { id } = params;
  const router = useRouter();
  const { address } = useAccount();

  const osRiskPanelty = 1.2;

  const data: Vault | null = getDetailedVaultData(address, id);
  const reserveData = getReserveParams(
    "0x6588b8894fca8cf664a5104c02483d947c24df3a4f2069053c798bcba9b23870"
  );

  const removeSPrefix = (symbol: string) => {
    return symbol.slice(1);
  };

  const tokenName = getTokenName(data ? data.tab : 0);
  const symbol = removeSPrefix(tokenName || "sUSD");
  const tabKey = stringToBytes3(symbol);
  const tabData = getTabParams(tabKey);
  const vaultDetailsFn = getVaultDetailsFn(address, id);

  const { data: auctionState }: { data: any } = useReadContract({
    ...VAULT_MANAGER_CONFIG,
    functionName: "auctionState",
    args: [id],
  });

  const { data: oraclePrice }: { data: any } = useReadContract({
    ...ORACLE_CONFIG,
    functionName: "getOldPrice",
    args: [tabKey],
  });
  const btcPrice = Number(oraclePrice) / 10 ** 18;

  const medianValue = async (tabname: string) => {
    const trimmedName = tabname.startsWith("s") ? tabname.slice(1) : tabname;
    let medianValue = 0;
    try {
      const apiUrl = "http://localhost:4545/median-price";

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const fullKey = `BTC${trimmedName}`;
      if (data.data.quotes[fullKey]) {
        medianValue = data.data.quotes[fullKey].median;
      } else {
        console.error(`Key ${fullKey} not found in the API response.`);
      }
      return medianValue ? medianValue / 10 ** 18 : 0;
    } catch (error) {
      console.error("Failed to fetch median value:", error);
      return 0;
    }
  };

  async function checkForRiskPanelty() {
    return await publicClient.readContract({
      ...VAULT_KEEPER_CONFIG,
      functionName: "chargedMap",
      args: [id],
    });
  }

  useEffect(() => {
    checkForRiskPanelty();
  }, []);

  function calcLiqPrice() {
    const reserveValue = (Number(data?.tabAmt) * 120) / 100;
    const liQuidationPrice = reserveValue / Number(data?.reserveAmt);
    return Number(liQuidationPrice).toFixed(4);
  }

  function VaultReserveRatio() {
    const reserVal = Number(vaultDetailsFn?.reserveValue) / 10 ** 18;
    const osVal = Number(vaultDetailsFn?.osTab) / 10 ** 18;
    const reserveR = (reserVal / osVal) * 100;
    return reserveR.toFixed(2);
  }
  const reserveRation = Number(VaultReserveRatio());

  function calReserveVal(medianVal: number | undefined) {
    const reserveValue = Number(data?.reserveAmt) / 10 ** 18;
    return (reserveValue * medianVal).toFixed(4);
  }

  if (!data) return <></>;
  return (
    <>
      <div className="container mx-auto min-h-[80vh] my-10">
        <div className="py-2">
          <button
            onClick={() => router.push("/vault")}
            className="border rounded-full border-black p-6"
          >
            <ArrowIcon />
          </button>
        </div>
        <h1 className="mt-6 text-4xl font-bold">
          {tokenName} protocol vault #{id}
        </h1>
        <div className="grid grid-cols-1 gap-4">
          <div className="col-start-1 col-span-2">
            <Tabs
              className="my-6"
              theme={customTabTheme}
              aria-label="Pills"
              style="pills"
            >
              <Tabs.Item active title="Manage">
                {auctionState && (
                  <p className="py-5 mb-4">
                    Liquidation has successfully been completed and all your
                    Outstanding Tabs have been settled. Auction contract:
                    0xb794f5ea0ba39494ce839613fffba74279579268
                  </p>
                )}
                {auctionState && <AuctionSateCard />}
                {!auctionState && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F2F2F2] p-4 rounded-3xl justify-center">
                    <div className="bg-white p-3 rounded-3xl">
                      <div className="max-w-full">
                        <div className="bg-[#708395] p-5 rounded-3xl">
                          <p className="text-white">Reserve Ratio</p>
                          <div className="flex mt-2">
                            <p className="text-3xl text-white">
                              {VaultReserveRatio()}%{" "}
                            </p>
                            <span className="my-auto ml-3">
                              <VerifiedCheckIcon />
                            </span>
                          </div>
                        </div>
                        {reserveRation < 180 ? (
                          <div className="p-2">
                            <div className="p-4 bg-[#FFEDEB] flex items-start rounded-3xl">
                              <div className="mr-4">
                                <img
                                  className="mt-1"
                                  src="/icons/Error.png"
                                  style={{ width: "100px" }}
                                />
                              </div>
                              <div>
                                <p className="text-base" style={{ margin: 0 }}>
                                  The Reserve Ratio is below the minimum
                                  required level and is now incurring a Risk
                                  Penalty. Please deposit more reserves or
                                  reduce the Outstanding Tabs by burning Tabs.
                                  We recommend a Reserve Ratio above 270%.
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : reserveRation < 270 ? (
                          <div className="p-2">
                            <div className="p-4 bg-[#FFF9E8] flex items-start rounded-3xl">
                              <div className="mr-4">
                                <img
                                  className="mt-1"
                                  src="/icons/info.png"
                                  style={{ width: "100px" }}
                                />
                              </div>
                              <div>
                                <p className="text-base" style={{ margin: 0 }}>
                                  To minimise the risk of the Reserve Ratio
                                  falling below the minimum required level, We
                                  recommend a Reserve Ratio above 270%. Please
                                  deposit more reserves or reduce the
                                  Outstanding Tabs by burning Tabs.
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        <div className="p-5">
                          <div className="my-2">
                            <p className="text-black text-sm">
                              Min. Reserve Ratio
                            </p>
                            <p className="text-lg text-black font-medium">
                              {reserveData &&
                                (reserveData?.minReserveRatio).toString()}
                              %
                            </p>
                          </div>
                          <div className="my-2">
                            <p className="text-black text-sm">Risk penalty</p>
                            <p className="text-lg text-black font-medium">
                              {tabData &&
                                (
                                  Number(tabData.riskPenaltyPerFrame) / 100
                                ).toString()}
                              % per day{" "}
                            </p>
                          </div>
                          <div className="my-2">
                            <p className="text-black text-sm">
                              Liquidation ratio
                            </p>
                            <p className="text-lg text-black font-medium">
                              {reserveData &&
                                reserveData.liquidationRatio.toString()}
                              %{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-3xl">
                      <div className="max-w-full">
                        <div className="bg-[#FB5108] p-5 rounded-3xl">
                          <p className="text-white">Liquidation price</p>
                          <div className="mt-2">
                            <p className="text-3xl text-white">
                              {calcLiqPrice()} {tokenName}
                            </p>
                          </div>
                        </div>
                        <div className="p-2">
                          <div className="p-4 bg-[#FFEDEB] flex items-start rounded-3xl">
                            <div className="mr-4">
                              <img
                                className="mt-1"
                                src="/icons/Error.png"
                                style={{ width: "40px" }}
                              />
                            </div>
                            <div>
                              <p className="text-base" style={{ margin: 0 }}>
                                If the price of your reserve fall below this
                                price, it will be liquidated through auction.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="my-2">
                            <p className="text-black text-sm">BTC price</p>
                            <p className="text-lg text-black font-medium">
                              {medianValue(symbol)} {tokenName}
                            </p>
                          </div>
                          <div className="my-2">
                            <p className="text-black text-sm">Reserves</p>
                            <p className="text-lg text-black font-medium">
                              {formatEther(data?.reserveAmt)} cBTC
                            </p>
                          </div>
                          <div className="my-2">
                            <p className="text-black text-sm">Reserve value</p>
                            <p className="text-lg text-black font-medium">
                              {calReserveVal(medianValue(symbol))} {tokenName}
                            </p>
                          </div>
                          <div className="mt-8 mb-2 flex flex-col">
                            <Link
                              href={id + "/deposit"}
                              className="text-center w-100 bg-black text-white rounded-3xl py-3"
                            >
                              Deposit reserves
                            </Link>
                          </div>
                          <div className="my-3">
                            <div className="text-center">
                              <Link
                                href={id + "/withdraw"}
                                className="border-b-2 border-black pb-1"
                              >
                                Withdraw reserves
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-3xl">
                      <div className="max-w-full">
                        <div className="bg-[#695D5A] p-5 rounded-3xl">
                          <p className="text-white">Outstanding tabs</p>
                          <div className="mt-2">
                            <p className="text-3xl text-white">
                              {vaultDetailsFn &&
                                Number(vaultDetailsFn.osTab) / 10 ** 18}{" "}
                              {tokenName}
                            </p>
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="my-2">
                            <p className="text-black text-sm">Minted tabs</p>
                            <p className="text-lg text-black font-medium">
                              {Number(data?.tabAmt) / 10 ** 18} {tokenName}
                            </p>
                          </div>
                          <div className="my-2">
                            <p className="text-black text-sm">Risk penalty</p>
                            <p
                              className={`text-lg text-black font-medium ${
                                osRiskPanelty > 0 ? "text-[#FF0000]" : ""
                              }`}
                            >
                              {osRiskPanelty} sUSD
                            </p>
                          </div>
                          <div className="mt-[25%]">
                            <div className="mt-8 mb-2 flex flex-col">
                              <Link
                                href={id + "/burn-tabs"}
                                className="text-center w-100 bg-black text-white rounded-3xl py-3"
                              >
                                Burn tabs
                              </Link>
                            </div>
                            <div className="my-3">
                              <div className="text-center">
                                <Link
                                  href={id + "/mint-tabs"}
                                  className="border-b-2 border-black pb-1"
                                >
                                  Mint Tabs
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Tabs.Item>
              <Tabs.Item title="History">
                <TableContent address={address as Address} />
              </Tabs.Item>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

const AuctionSateCard = (auctionState: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F2F2F2] p-4 rounded-3xl justify-center">
      <div className="bg-white p-3 rounded-3xl">
        <div className="max-w-full">
          <div className="bg-[#708395] p-5 rounded-3xl">
            <p className="text-white">Reserves</p>
            <div className="flex mt-2">
              <p className="text-3xl text-white">
                {auctionState.reserveQty} cBTC{" "}
              </p>
            </div>
          </div>

          <div className="py-5 px-5 mt-12 mb-12 text-center">
            <p>
              {Number(auctionState.reserveQty)
                ? "You may withdraw remaining reserves from the auction process."
                : "No reserves remain."}
            </p>
          </div>

          <div className="flex items-center justify-center p-5">
            <button
              disabled={auctionState.reserveQty == 0}
              className={`text-center w-full ${
                auctionState.reserveQty == 0 ? "#A2A2A2" : "bg-black"
              } bg-black text-white rounded-3xl py-3 px-4`}
            >
              Withdrawal reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

type Transaction = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
};
const TableContent = ({ address }: { address: string }) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [currentItems, setCurrentItems] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<number>();
  const updateCurrentPage = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  const associatedContractAddresses: string | string[] =
    VAULT_MANAGER_CONFIG.address;

  const getWalletHistoryData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api-sepolia.arbiscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=latest&sort=asc&apikey=${process.env.ARB_SCAN_API_KEY}`
      );
      const data = await response.json();

      if (data.status !== "1") {
        console.error("Error fetching transaction data:", data.message);
        setLoading(false);
        return;
      }

      const dataArr: any[] = data.result;
      const filteredTransactions = dataArr.filter((transaction: any) => {
        if (!transaction.to) return false;
        if (Array.isArray(associatedContractAddresses)) {
          return associatedContractAddresses.includes(
            transaction.to.trim().toLowerCase()
          );
        } else {
          return (
            associatedContractAddresses.trim().toLowerCase() ===
            transaction.to.trim().toLowerCase()
          );
        }
      });
      setTransactions(filteredTransactions);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    } finally {
      setLoading(false);
    }
  };

  function formatDate(timestamp: number) {
    const date = new Date(timestamp);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${month} ${day} ${year}, ${hours}:${minutes} ${ampm}`;
  }

  const extractFunctionName = (fullFunctionName: string): string => {
    const match = fullFunctionName.match(/^([a-zA-Z0-9_]+)\(/);
    if (match) {
      const functionName = match[1];
      const words = functionName
        .split(/(?=[A-Z])/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
      return words.join(" ");
    } else {
      return fullFunctionName;
    }
  };

  useEffect(() => {
    getWalletHistoryData();
  }, [address]);

  useEffect(() => {
    if (transactions) {
      let sortedTranx = transactions.sort(function (a: any, b: any) {
        const aTime = a.timeStamp;
        const bTime = b.timeStamp;
        if (aTime < bTime) return -1;
        if (aTime > bTime) return 1;
        return 0;
      });
      if (sortOrder === "asc") {
        sortedTranx = sortedTranx.reverse();
      }

      if (selectedDate) {
        const filteredTransactions = transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.timeStamp * 1000);
          const selectedDateTime = new Date(selectedDate * 1000);
          return (
            transactionDate.toDateString() === selectedDateTime.toDateString()
          );
        });
        setCurrentItems(filteredTransactions);
        return;
      }
      const lastItemIndex = currentPage * itemsPerPage;
      const firstItemIndex = lastItemIndex - itemsPerPage;
      setCurrentItems(sortedTranx.slice(firstItemIndex, lastItemIndex));
      setTotalPages(Math.ceil(transactions.length / itemsPerPage));
    }
  }, [transactions, currentPage, sortOrder, selectedDate]);

  const handleDateChange = (date: any) => {
    setSelectedDate(date.getTime() / 1000);
  };

  return (
    <>
      <div className="">
        <div className="flex justify-between items-end mb-10">
          <div className="flex space-x-6">
            <div>
              <label>Sort By</label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <Datepicker
                  onSelectedDateChanged={handleDateChange}
                  theme={dpCustomTheme}
                  weekStart={1}
                />
              </div>
            </div>
            <div>
              <label>Sort by</label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <select
                  id="sort"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-2 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                >
                  <option value="asc">Newest to oldest</option>
                  <option value="dsc">Oldest to newest</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {loading && (
          <div className="flex justify-center items-center">
            <h1>Loading</h1>
          </div>
        )}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          {selectedDate && !currentItems && (
            <p className="text-center text-black">
              No transactions found for the selected date
            </p>
          )}
          <tbody>
            {currentItems.map((item: any, index) => (
              <tr key={index} className="odd:bg-[#F9F9F9] even:bg-white ">
                <td className="py-4">
                  <div className=" py-2 bg-[#CBD2DA] rounded-[100px]">
                    <p className="mx-auto text-center text-black">
                      {formatDate(item.timeStamp * 1000)}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`https://sepolia.arbiscan.io/tx/${item.hash}`}
                    className="border-black border-b-2 text-black pb-1"
                  >
                    View transaction
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <p className="text-black py-2">
                    {extractFunctionName(item.functionName)}
                  </p>
                </td>
                <td className="px-6 py-4">
                  {item.value ? item.value / 10 ** 18 : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {transactions &&
        !loading &&
        !selectedDate &&
        transactions.length > 10 && (
          <div className="grid justify-items-center py-10">
            <div className="flex items-center gap-4">
              <button
                className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none text-center align-middle transition-all"
                type="button"
                onClick={() => updateCurrentPage(1)}
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <svg
                    width="17"
                    height="22"
                    viewBox="0 0 17 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.90674 2.18555L1.90674 20.1855"
                      stroke="#CACACA"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8.02908 10.9866L15.7345 3.28122C15.9649 3.05079 16.0825 2.7651 16.0872 2.42415C16.0919 2.0832 15.9791 1.79388 15.7486 1.5562C15.5015 1.3091 15.2052 1.18555 14.8595 1.18555C14.5138 1.18555 14.2222 1.3091 13.9845 1.5562L5.91493 9.5975C5.71783 9.7946 5.57417 10.0131 5.48396 10.2529C5.39374 10.4928 5.34863 10.7374 5.34863 10.9866C5.34863 11.2359 5.39374 11.4805 5.48396 11.7203C5.57417 11.9602 5.71783 12.1787 5.91493 12.3758L13.9845 20.4161C14.2222 20.6632 14.5138 20.7868 14.8595 20.7868C15.2052 20.7868 15.5015 20.6632 15.7486 20.4161C15.9957 20.169 16.1193 19.8728 16.1193 19.5271C16.1193 19.1814 15.9957 18.8898 15.7486 18.6521L8.02908 10.9866Z"
                      fill="#CACACA"
                    />
                  </svg>
                </span>
              </button>
              <button
                className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none text-center align-middle transition-all"
                type="button"
                onClick={() => updateCurrentPage(currentPage - 1)}
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <svg
                    width="10"
                    height="17"
                    viewBox="0 0 10 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.85961 1.927L2.54649 8.24012L8.85961 14.5532"
                      stroke="#CACACA"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <div className="flex items-center gap-2">
                <div>
                  <span className="block text-sm font-semibold text-[#737373]">
                    Page
                  </span>
                </div>
                <div>
                  <input
                    type="number"
                    value={currentPage}
                    onChange={(e) => {
                      const pageNumber = parseInt(e.target.value, 10);
                      updateCurrentPage(pageNumber);
                    }}
                    className="block w-12 rounded-md border-0 py-2 pl-4 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <span className="block text-sm font-semibold text-[#737373]">
                    of {totalPages}
                  </span>
                </div>
              </div>
              <button
                className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none text-center align-middle transition-all"
                type="button"
                onClick={() => updateCurrentPage(currentPage + 1)}
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <svg
                    width="10"
                    height="17"
                    viewBox="0 0 10 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.39062 1.927L7.70373 8.24012L1.39062 14.5532"
                      stroke="#CACACA"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <button
                className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none text-center align-middle transition-all"
                type="button"
                onClick={() => updateCurrentPage(totalPages)}
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <svg
                    width="17"
                    height="22"
                    viewBox="0 0 17 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7334 2.18555L15.7334 20.1855"
                      stroke="#CACACA"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.61108 10.9866L1.90564 3.28122C1.67522 3.05079 1.55761 2.7651 1.55289 2.42415C1.54817 2.0832 1.66093 1.79388 1.89138 1.5562C2.1385 1.3091 2.43478 1.18555 2.78049 1.18555C3.1262 1.18555 3.41782 1.3091 3.65552 1.5562L11.7251 9.5975C11.9222 9.7946 12.0659 10.0131 12.1561 10.2529C12.2463 10.4928 12.2914 10.7374 12.2914 10.9866C12.2914 11.2359 12.2463 11.4805 12.1561 11.7203C12.0659 11.9602 11.9222 12.1787 11.7251 12.3758L3.65552 20.4161C3.41782 20.6632 3.1262 20.7868 2.78049 20.7868C2.43478 20.7868 2.1385 20.6632 1.89138 20.4161C1.64428 20.169 1.52073 19.8728 1.52073 19.5271C1.52073 19.1814 1.64428 18.8898 1.89138 18.6521L9.61108 10.9866Z"
                      fill="#CACACA"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        )}
    </>
  );
};

const VerifiedCheckIcon = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.94995 11.6999L8.49995 10.2749C8.31662 10.0915 8.08745 9.99987 7.81245 9.99987C7.53745 9.99987 7.29995 10.0999 7.09995 10.2999C6.91662 10.4832 6.82495 10.7165 6.82495 10.9999C6.82495 11.2832 6.91662 11.5165 7.09995 11.6999L9.24995 13.8499C9.44995 14.0499 9.68328 14.1499 9.94995 14.1499C10.2166 14.1499 10.45 14.0499 10.65 13.8499L14.9 9.59987C15.1 9.39987 15.1958 9.16654 15.1875 8.89987C15.1791 8.63321 15.0833 8.39987 14.9 8.19987C14.7 7.99987 14.4625 7.89571 14.1875 7.88737C13.9125 7.87904 13.675 7.97487 13.475 8.17487L9.94995 11.6999ZM7.14995 20.7499L5.69995 18.2999L2.94995 17.6999C2.69995 17.6499 2.49995 17.5207 2.34995 17.3124C2.19995 17.104 2.14162 16.8749 2.17495 16.6249L2.44995 13.7999L0.574951 11.6499C0.408285 11.4665 0.324951 11.2499 0.324951 10.9999C0.324951 10.7499 0.408285 10.5332 0.574951 10.3499L2.44995 8.19987L2.17495 5.37487C2.14162 5.12487 2.19995 4.89571 2.34995 4.68737C2.49995 4.47904 2.69995 4.34987 2.94995 4.29987L5.69995 3.69987L7.14995 1.24987C7.28328 1.03321 7.46662 0.887374 7.69995 0.812374C7.93328 0.737374 8.16662 0.749874 8.39995 0.849874L11 1.94987L13.6 0.849874C13.8333 0.749874 14.0666 0.737374 14.3 0.812374C14.5333 0.887374 14.7166 1.03321 14.85 1.24987L16.3 3.69987L19.05 4.29987C19.3 4.34987 19.5 4.47904 19.65 4.68737C19.8 4.89571 19.8583 5.12487 19.825 5.37487L19.55 8.19987L21.425 10.3499C21.5916 10.5332 21.675 10.7499 21.675 10.9999C21.675 11.2499 21.5916 11.4665 21.425 11.6499L19.55 13.7999L19.825 16.6249C19.8583 16.8749 19.8 17.104 19.65 17.3124C19.5 17.5207 19.3 17.6499 19.05 17.6999L16.3 18.2999L14.85 20.7499C14.7166 20.9665 14.5333 21.1124 14.3 21.1874C14.0666 21.2624 13.8333 21.2499 13.6 21.1499L11 20.0499L8.39995 21.1499C8.16662 21.2499 7.93328 21.2624 7.69995 21.1874C7.46662 21.1124 7.28328 20.9665 7.14995 20.7499ZM8.44995 18.9499L11 17.8499L13.6 18.9499L15 16.5499L17.75 15.8999L17.5 13.0999L19.35 10.9999L17.5 8.84987L17.75 6.04987L15 5.44987L13.55 3.04987L11 4.14987L8.39995 3.04987L6.99995 5.44987L4.24995 6.04987L4.49995 8.84987L2.64995 10.9999L4.49995 13.0999L4.24995 15.9499L6.99995 16.5499L8.44995 18.9499Z"
        fill="white"
      />
    </svg>
  );
};

const ArrowIcon = () => {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.92146 7.13764H14.8263C15.1455 7.13764 15.4149 7.02785 15.6345 6.80829C15.8541 6.58872 15.9639 6.31934 15.9639 6.00014C15.9639 5.68094 15.8541 5.41155 15.6345 5.19199C15.4149 4.97242 15.1455 4.86264 14.8263 4.86264H3.92146L6.55026 2.23384C6.77417 2.00992 6.88296 1.7447 6.87661 1.43819C6.87028 1.13165 6.76149 0.866436 6.55026 0.642536C6.32634 0.418619 6.05795 0.303486 5.74508 0.297136C5.43223 0.290803 5.16385 0.399594 4.93993 0.623511L0.358958 5.19851C0.246992 5.31046 0.165192 5.43474 0.113559 5.57134C0.0619423 5.70792 0.0361328 5.85085 0.0361328 6.00014C0.0361328 6.14942 0.0619423 6.29235 0.113559 6.42894C0.165192 6.56554 0.246992 6.68981 0.358958 6.80176L4.93993 11.3768C5.16385 11.6007 5.43223 11.7095 5.74508 11.7031C6.05795 11.6968 6.32634 11.5817 6.55026 11.3577C6.76149 11.1338 6.87028 10.8686 6.87661 10.5621C6.88296 10.2556 6.77417 9.99035 6.55026 9.76644L3.92146 7.13764Z"
        fill="#161616"
      />
    </svg>
  );
};
