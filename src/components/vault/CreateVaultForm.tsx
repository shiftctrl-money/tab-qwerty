"use client";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useEffect, useState } from "react";
import { Address, erc20Abi, keccak256, parseEther, toBytes } from "viem";
import getAmountOut from "@/hooks/getAmountOut";
import getBalanceOfToken from "@/hooks/getBalanceOfToken";
import { useTabCount } from "@/hooks/getTabCount";
import {
  VAULT_MANAGER_CONFIG,
  CONFIG_CONTRACT,
  ORACLE_CONFIG,
} from "@/app/helpers/index";
import toast from "react-hot-toast";
import { Modal } from "flowbite-react";
import Link from "next/link";
import { CreateVaultCard } from "./CreateVaultCard";
import { useReadContract } from "wagmi";
import { publicClient } from "@/utils/viemConfig";

const cBTC = "0x5858c725d643Cde4Ec36e952cc965E4107898239";

type cardsType = {
  tab: string;
  reserveRatio: number;
  riskPenalty: string;
  liquidationRatio: number;
  reserveType: string | number;
  btcPrice: string;
  reserveValue: number;
  liquidationPrice: number;
};

export const CreateVaultForm = () => {
  const { address, isConnected } = useAccount();
  const [cardsData, setCardsData] = useState<cardsType>();
  const [tab, setTab] = useState<string>();
  const [tabAmount, setTabAmount] = useState("0");
  const [reserveType, setReserveType] = useState(
    "0x6588b8894fca8cf664a5104c02483d947c24df3a4f2069053c798bcba9b23870"
  );
  const [reserveAmount, setReserveAmount] = useState("0");
  const [openModal, setOpenModal] = useState(false);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [latestCreatedVault, setLatestCreatedVault] = useState();
  const balance = getBalanceOfToken(address as Address, cBTC);
  const rAmount = getAmountOut(cBTC, reserveAmount);

  const {
    data: hash,
    error,
    writeContract,
    writeContractAsync,
  } = useWriteContract();

  const {
    data: hashData,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: iserror,
  } = useWaitForTransactionReceipt({
    hash,
  });
  console.log(hashData);

  const { data: reserveData }: { data: any } = useReadContract({
    ...CONFIG_CONTRACT,
    functionName: "reserveParams",
    args: [reserveType],
  });

  const { data: tabData }: { data: any } = useReadContract({
    ...CONFIG_CONTRACT,
    functionName: "tabParams",
    args: [tab],
  });
  console.log(tabData);

  const { data: oraclePrice } = useReadContract({
    ...ORACLE_CONFIG,
    functionName: "getOldPrice",
    args: [tab],
  });

  const { data: latestVaults }: { data: any } = useReadContract({
    ...VAULT_MANAGER_CONFIG,
    functionName: "getAllVaultIDByOwner",
    args: [(address as Address) || ""],
  });

  const { tabList: tabCount, error: tabCountError } = useTabCount();

  const createVault = async () => {
    setOpenModal(false);
    setOpenLoadingModal(true);
    try {
      if (!address || !isConnected) {
        throw new Error("Please connect your wallet");
      }
      const tabAmountWei = parseEther(tabAmount);
      const balanceWei = balance ? parseEther(balance) : 0;
      console.log(balance, balanceWei, tabAmountWei, rAmount);
      if (!balance || balanceWei < rAmount) {
        toast.error("Not enough token balance!");
        return;
      }
      if (!tab) {
        toast.error("Select tab token");
        return;
      }

      await writeContractAsync({
        abi: erc20Abi,
        address: cBTC,
        functionName: "approve",
        args: [VAULT_MANAGER_CONFIG.address, BigInt(rAmount.toString())],
      });

      toast.loading("Check your wallet to approve transaction");

      writeContract({
        ...VAULT_MANAGER_CONFIG,
        functionName: "createVault",
        args: [reserveType, rAmount, tab, tabAmountWei],
      });
      setOpenLoadingModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
      setOpenLoadingModal(false);
    }
  };

  function bytes3ToString(bytes3Hex: any) {
    if (bytes3Hex.startsWith("0x")) {
      bytes3Hex = bytes3Hex.slice(2);
    }
    // Split the hexadecimal string into pairs of characters (bytes)
    const pairs = bytes3Hex.match(/.{1,2}/g);

    // Convert each pair of characters to its corresponding byte
    const bytes = pairs.map((pair: string) => parseInt(pair, 16));

    // Convert bytes to string
    let result = "";
    for (let i = 0; i < bytes.length; i++) {
      result += String.fromCharCode(bytes[i]);
    }
    return result;
  }

  function calcLiqPrice() {
    const minimumReserveValue = (Number(tabAmount) * 120) / 100;
    const liQuidationPrice = minimumReserveValue / Number(reserveAmount);
    return liQuidationPrice;
  }

  function setCardData() {
    if (
      tabData &&
      tab &&
      +tabAmount > 0 &&
      reserveType &&
      +reserveAmount > 0 &&
      oraclePrice &&
      reserveData
    ) {
      setCardsData({
        tab: bytes3ToString(tab),
        reserveRatio: reserveData[1].toString(),
        riskPenalty: (Number(tabData[0]) / 100).toString(),
        liquidationRatio: reserveData[2].toString(),
        reserveType: bytes3ToString(reserveType),
        btcPrice: oraclePrice.toString(),
        reserveValue: Number(reserveAmount) * Number(oraclePrice),
        liquidationPrice: calcLiqPrice(),
      });
    }
  }

  useEffect(() => {
    if (isConfirmed)
      toast.success("Transaction has been successfully completed.");
  }, [isConfirmed]);

  useEffect(() => {
    if (error || iserror) {
      console.log(error || iserror);
      toast.dismiss();
      toast.error("Something is wrong");
    }
  }, [error, iserror]);

  useEffect(() => {
    if (tab && tabAmount && reserveType && reserveAmount) {
      setCardData();
    }
  }, [tab, tabAmount, reserveType, reserveAmount]);

  useEffect(() => {
    if (hash) {
      setOpenSuccessModal(true);
      toast.dismiss();
      toast.success("Transaction has been successfully completed.");
    }
  }, [hash]);

  useEffect(() => {
    if (hash) {
      setLatestCreatedVault(latestVaults.length || 0);
    }
  }, [hash]);

  return (
    <>
      <div className="flex gap-4 h-full">
        <div className="w-2/4 flex flex-col">
          <div className="flex">
            <div>
              <img width={50} className="h-auto" src="/assets/coin.png" />
            </div>
            <div className="flex items-center ml-4">
              <h1 className="text-3xl font-semibold">Create a new vault</h1>
            </div>
          </div>
          <p className="my-8">
            Use the simulation on the right to determine the ideal configuration
            for you.
          </p>
          <div className="">
            <div className="py-2">
              <label className="text-sm font-medium">Tab currency</label>
              <div className="relative mt-2 rounded-md shadow-sm">
                {tabCount && tabCount?.length > 0 ? (
                  <>
                    <select
                      onChange={(e) => setTab(e.target.value)}
                      id="countries"
                      className="block w-full rounded-xl border-0 py-2 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                      value={tab}
                    >
                      <option value="000" disabled selected>
                        Select a tab
                      </option>
                      {tabCount?.map((item) => (
                        <option key={item} value={item}>
                          {bytes3ToString(item)}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <DownArrow />
                    </div>
                  </>
                ) : (
                  <input
                    type="text"
                    className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    disabled
                    value={
                      //isTabListLoading ? "Loading Tabs..." : "No tabs found"
                      "Loading Tabs..."
                    }
                  />
                )}
                {tabCountError && <p>Error: {tabCountError.message}</p>}
              </div>
            </div>
            <div className="py-2">
              <label className="text-sm font-medium">Reserve type</label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <select
                  onChange={(e) =>
                    setReserveType(keccak256(toBytes(e?.target.value)))
                  }
                  id="countries"
                  className="block w-full rounded-xl border-0 py-2 pl-4 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                >
                  <option value={"CBTC"} selected>
                    CBTC
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <DownArrow />
                </div>
              </div>
            </div>
            <div className="py-2">
              <label className="text-sm font-medium">Reserve amount</label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  onChange={(e) => setReserveAmount(e.currentTarget.value)}
                  type="number"
                  name="price"
                  id="price"
                  className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Enter a deposit amount"
                  value={reserveAmount}
                />
                <div className="absolute px-4 inset-y-0 right-0 flex items-center">
                  cBTC
                </div>
              </div>
              <div className="mx-auto flex justify-between items-center">
                <p className="text-sm my-4">
                  Available: {balance ? balance : 0}
                </p>
                <button
                  className="underline "
                  onClick={() => setReserveAmount(balance!)}
                >
                  Max
                </button>
              </div>
            </div>
            <div className="py-2">
              <label className="text-sm font-medium">Tab amount</label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  onChange={(e) => setTabAmount(e?.currentTarget.value)}
                  type="number"
                  name="price"
                  id="price"
                  className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  placeholder="Enter a deposit amount"
                />
              </div>
            </div>
            <button
              onClick={() => setOpenModal(true)}
              disabled={!tab || !tabAmount || !reserveType || !reserveAmount}
              className="mt-10 w-full bg-black text-white py-2 px-5 rounded-3xl"
            >
              Create vault
            </button>
          </div>
        </div>
        <CreateVaultCard data={cardsData} />
      </div>

      {/* details modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="border-0 pb-1">
          <p className="text-3xl">Confirmation</p>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Please review and confirm the details of your sUSD vault.
            </p>
            <div>
              <div className="flex gap-10">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 py-2">
                    Reserve type
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 py-2">
                    Deposit amount
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 py-2">
                    Mint amount
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 py-2">
                    Reserve ratio
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 py-2">
                    Liquidation price
                  </p>
                </div>
                <div>
                  <p className="font-semibold	 py-2">CBTC</p>
                  <p className="font-semibold	 py-2">{reserveAmount} CBTC </p>
                  <p className="font-semibold	 py-2">
                    {tabAmount} {tab ? bytes3ToString(tab) : ""}
                  </p>
                  <p className="font-semibold	 py-2">230 %</p>
                  <p className="font-semibold	 py-2">
                    {calcLiqPrice().toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end border-0">
          <button
            className="bg-white text-black py-3 px-5 rounded-3xl border border-black"
            onClick={() => setOpenModal(false)}
          >
            Back
          </button>
          <button
            className="bg-black text-white py-3 px-5 rounded-3xl"
            color="gray"
            onClick={createVault}
          >
            Create vault
          </button>
        </Modal.Footer>
      </Modal>

      {/* loading modal */}
      <Modal show={openLoadingModal} onClose={() => setOpenLoadingModal(false)}>
        <Modal.Header className="border-0 pb-1"></Modal.Header>
        <Modal.Body className="pt-2">
          <div className="space-y-4">
            {error ? (
              <>
                <p className=" leading-relaxed text-black text-3xl text-center mt-10">
                  Something went wrong
                </p>
              </>
            ) : (
              <>
                <p className=" leading-relaxed text-black text-3xl text-center mt-10">
                  Creating your vault
                </p>
                <p className="text-center">
                  Your vault along with your minted tabs will be ready soon
                </p>
              </>
            )}

            <p className="text-center">
              {hash && (
                <Link
                  className="underline"
                  href={`https://sepolia.arbiscan.io/tx/${hash}`}
                >
                  View transaction
                </Link>
              )}
            </p>
          </div>
        </Modal.Body>
      </Modal>

      {/* success modal */}
      <Modal show={openSuccessModal} onClose={() => setOpenSuccessModal(false)}>
        <Modal.Header className="border-0 pb-1"></Modal.Header>
        <Modal.Body className="pt-2">
          <div className="space-y-4">
            <p className=" leading-relaxed text-black text-3xl text-center mt-10">
              Vault successfully created!
            </p>
            <p className="text-center">Vault successfully created. </p>
            <p className="text-center">
              <Link
                className="underline"
                href={`https://sepolia.arbiscan.io/tx/${hash}`}
              >
                View transaction
              </Link>
            </p>
            <div className="flex flex-col items-center mt-10 pt-10">
              <Link
                className="bg-black text-white py-3 px-5 rounded-3xl col-span-2"
                href={`/vault/${latestCreatedVault && latestCreatedVault + 1}`}
              >
                Go to vault
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <p className="underline">close</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const DownArrow = () => {
  return (
    <svg
      width={20}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M7 10L12 15L17 10"
          stroke="#000000"
          stroke-width="1.5"
          strokeLinecap="round"
          stroke-linejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};
