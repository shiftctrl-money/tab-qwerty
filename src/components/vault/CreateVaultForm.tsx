"use client";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useEffect, useState } from "react";
import { Address, erc20Abi, keccak256, parseEther, toBytes } from "viem";
import getAmountOut from "@/hooks/getAmountOut";
import {
  VAULT_MANAGER_CONFIG,
  ORACLE_CONFIG,
  TabCurrencies,
  stringToBytes3,
  bytes3ToString,
} from "@/app/helpers/index";
import toast from "react-hot-toast";
import { Modal } from "flowbite-react";
import Link from "next/link";
import { CreateVaultCard } from "./CreateVaultCard";
import { useReadContract } from "wagmi";
import getTabParams from "@/hooks/getTabParams";
import getReserveParams from "@/hooks/getReserveParams";
import { account, publicClient, walletClient } from "@/utils/viemConfig";

const cBTC = "0x538a7C3b36315554DDa6B1f8321c2e50fd95a271";

type cardsType = {
  tab: string;
  reserveRatio: number;
  minReserveRatio: number;
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
  const [tab, setTab] = useState<string>("USD");
  const [tabAmount, setTabAmount] = useState<number>(0);
  const [reserveType, setReserveType] = useState<string>(
    "0x6588b8894fca8cf664a5104c02483d947c24df3a4f2069053c798bcba9b23870"
  );
  const [reserveAmount, setReserveAmount] = useState<string>("0");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openLoadingModal, setOpenLoadingModal] = useState<boolean>(false);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [latestCreatedVault, setLatestCreatedVault] = useState<number>();
  const [reserveErrorMessage, setReserveErrorMessage] =
    useState<boolean>(false);
  const [tabErrorMessage, setTabErrorMessage] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);

  const rAmount = getAmountOut(cBTC, reserveAmount);

  const { data: cbtcBalance } = useReadContract({
    abi: erc20Abi,
    functionName: "balanceOf",
    address: cBTC as Address,
    args: [address as Address],
  });

  const handleReserveChange = (value: string) => {
    setReserveAmount(value);
    if (Number(value) > Number(balance)) {
      setReserveErrorMessage(true);
    } else {
      setReserveErrorMessage(false);
    }
  };

  const handleTabChange = (value: string) => {
    setTabAmount(Number(value));
    if (Number(value) > Number(oraclePrice) / 10 ** 18) {
      setTabErrorMessage(true);
    } else {
      setTabErrorMessage(false);
    }
  };

  const {
    data: hash,
    error,
    writeContract,
    writeContractAsync,
  } = useWriteContract();

  const { isSuccess: isConfirmed, error: iserror } =
    useWaitForTransactionReceipt({
      hash,
    });

  const reserveData = getReserveParams(reserveType);
  const tabData = getTabParams(tab);

  const { data: oraclePrice } = useReadContract({
    ...ORACLE_CONFIG,
    functionName: "getOldPrice",
    args: [tab],
  });

  const { data: latestVaults }: { data: bigint[] | undefined } =
    useReadContract({
      ...VAULT_MANAGER_CONFIG,
      functionName: "getAllVaultIDByOwner",
      args: [(address as Address) || ""],
    });

  //  Create Vault
  const createVault = async () => {
    setOpenModal(false);
    setOpenLoadingModal(true);

    // if (Number(oraclePrice) === 0 || !oraclePrice) {
    //   toast.error("Oracle price is not available!");
    //   setOpenLoadingModal(false);
    //   return;
    // }

    try {
      if (!address || !isConnected) {
        throw new Error("Please connect your wallet");
      }
      const tabAmountWei = parseEther(tabAmount.toString());
      const balanceWei = balance ? parseEther(balance.toString()) : 0;
      if (!balance || balanceWei < rAmount) {
        toast.error("Not enough token balance!");
        return;
      }
      if (!tab) {
        toast.error("Select tab token");
        return;
      }

      const allowance = await publicClient.readContract({
        address: cBTC,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address, VAULT_MANAGER_CONFIG.address],
      });

      if (allowance < Number(rAmount)) {
        await writeContractAsync({
          abi: erc20Abi,
          address: cBTC,
          functionName: "approve",
          args: [VAULT_MANAGER_CONFIG.address, BigInt(10 ** 40)],
        });
        toast.loading("Check your wallet to approve transaction");
      }

      if (
        !tabData ||
        (Number(tabData?.riskPenaltyPerFrame) == 0 &&
          Number(tabData?.processFeeRate) == 0)
      ) {
        await writeContract({
          ...VAULT_MANAGER_CONFIG,
          functionName: "initNewTab",
          args: [tab],
          account,
        });
      }

      await writeContract({
        ...VAULT_MANAGER_CONFIG,
        functionName: "createVault",
        args: [reserveType, rAmount, tab, tabAmountWei],
      });
      setOpenLoadingModal(false);
    } catch (err) {
      console.error("error", err);
      console.log(error);
      setOpenLoadingModal(false);
    }
  };

  function calcLiqPrice() {
    const minimumReserveValue = (tabAmount * 120) / 100;
    const liQuidationPrice = minimumReserveValue / Number(reserveAmount);
    return liQuidationPrice;
  }

  function setCardData() {
    if (
      tabData &&
      tab &&
      tabAmount > 0 &&
      reserveType &&
      Number(reserveAmount) > 0 &&
      oraclePrice &&
      reserveData
    ) {
      setCardsData({
        tab: bytes3ToString(tab),
        reserveRatio: 270,
        minReserveRatio: Number(reserveData.minReserveRatio),
        riskPenalty: (Number(tabData.riskPenaltyPerFrame) / 100).toString(),
        liquidationRatio: Number(reserveData.liquidationRatio),
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
      toast.error("Something went wrong!");
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
      toast.success("Transaction has been successfully completed.");
    }
  }, [hash]);

  useEffect(() => {
    if (hash) {
      setLatestCreatedVault(latestVaults ? latestVaults?.length : 0);
    }
  }, [hash]);

  useEffect(() => {
    if (cbtcBalance) {
      setBalance(Number(cbtcBalance) / 10 ** 18);
    }
  }, [cbtcBalance, address]);

  return (
    <>
      {address && isConnected ? (
        <>
          <div className="flex flex-col lg:flex-row gap-4 h-full p-4 lg:p-0">
            <div className="w-full lg:w-2/5 flex flex-col">
              <div className="flex">
                <div>
                  <img width={50} className="h-auto" src="/assets/coin.png" />
                </div>
                <div className="flex items-center ml-4">
                  <h1 className="text-2xl lg:text-3xl font-semibold">
                    Create a new vault
                  </h1>
                </div>
              </div>
              <p className="my-4 lg:my-8">
                Use the simulation on the right to determine the ideal
                configuration for you.
              </p>
              <div>
                <div className="py-2">
                  <label className="text-sm font-medium">Tab currency</label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <select
                      onChange={(e) => setTab(e.target.value)}
                      id="countries"
                      className="block w-full rounded-xl border-0 py-2 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 focus:ring-gray-900"
                      value={tab}
                    >
                      <option value="000" selected>
                        Select a tab
                      </option>
                      {TabCurrencies?.map((item) => (
                        <option key={item} value={stringToBytes3(item)}>
                          s{item}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <DownArrow />
                    </div>
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
                      className="block w-full rounded-xl border-0 py-2 pl-4 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-6 focus:ring-gray-900"
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
                  <div className="relative mt-2 rounded-md shadow-sm ">
                    <input
                      min={0}
                      onChange={(e) =>
                        handleReserveChange(e.currentTarget.value)
                      }
                      type="number"
                      name="price"
                      id="price"
                      className={`block w-full rounded-xl border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ${
                        reserveErrorMessage
                          ? "ring-red-500 focus:ring-red-500"
                          : "ring-gray-900 focus:ring-gray-900"
                      } placeholder:text-gray-400  sm:text-sm sm:leading-6 `}
                      placeholder="Enter a deposit amount"
                      value={reserveAmount}
                    />
                    <div className="absolute px-4 inset-y-0 right-0 flex items-center">
                      cBTC
                    </div>
                  </div>
                  <div className="mx-auto flex justify-between items-center">
                    {reserveErrorMessage ? (
                      <p className="text-sm my-4 text-red-500">
                        Insufficient balance to deposit this amount.
                      </p>
                    ) : (
                      <p className="text-sm my-4">
                        Available: {balance ? balance : 0}
                      </p>
                    )}
                    <button
                      className="underline"
                      onClick={() => setReserveAmount(balance.toString())}
                    >
                      Max
                    </button>
                  </div>
                </div>
                <div className="py-2">
                  <label className="text-sm font-medium">Mint amount</label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      min={0}
                      onChange={(e) => handleTabChange(e?.currentTarget.value)}
                      type="number"
                      name="price"
                      id="price"
                      className={`block w-full rounded-xl border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ${
                        tabErrorMessage
                          ? "ring-red-500 focus:ring-red-500"
                          : "ring-gray-900 focus:ring-gray-900"
                      } placeholder:text-gray-400  sm:text-sm sm:leading-6 `}
                      placeholder="Enter a deposit amount"
                    />
                  </div>
                </div>
                {tabErrorMessage && (
                  <p className="text-sm my-1 text-red-500">
                    There is insufficient reserves to mint this amount.
                  </p>
                )}
                <button
                  onClick={() => setOpenModal(true)}
                  disabled={
                    !tab || tabAmount <= 0 || !reserveType || !reserveAmount
                  }
                  className="mt-10 w-full bg-black text-white py-2 px-5 rounded-3xl"
                >
                  Create vault
                </button>
              </div>
            </div>
            <div className="w-full lg:w-3/5">
              <CreateVaultCard data={cardsData} />
            </div>
          </div>

          {/* details modal */}
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header className="border-0 pb-1">
              <p className="text-3xl">Confirmation</p>
            </Modal.Header>
            <Modal.Body className="pt-2">
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Please review and confirm the details of your{" "}
                  {bytes3ToString(tab)} vault.
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
                      <p className="font-semibold	 py-2">
                        {reserveAmount} CBTC{" "}
                      </p>
                      <p className="font-semibold	 py-2">
                        {tabAmount} {tab ? bytes3ToString(tab) : ""}
                      </p>
                      <p className="font-semibold	 py-2">270 %</p>
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
          <Modal
            show={openLoadingModal}
            onClose={() => setOpenLoadingModal(false)}
          >
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
                    <div className="flex justify-center">
                      <img
                        className="h-auto max-w-[150px]"
                        src="/icons/creating_your_vault.png"
                      />
                    </div>
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
          <Modal
            show={openSuccessModal}
            onClose={() => setOpenSuccessModal(false)}
          >
            <Modal.Header className="border-0 pb-1"></Modal.Header>
            <Modal.Body className="pt-2">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <img
                    className="h-auto max-w-[150px]"
                    src="/icons/success_vault.png"
                  />
                </div>
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
                    href={`/vault/${
                      latestCreatedVault && latestCreatedVault + 1
                    }`}
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
      ) : (
        <div className=" flex-row justify-center mt-[12%]">
          <div className="">
            <div className="flex justify-center">
              <img className="h-auto max-w-[150px]" src="/icons/Warning.png" />
            </div>

            <h1 className="text-3xl text-center mb-5">
              Please connect your wallet first
            </h1>
          </div>
        </div>
      )}
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
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M7 10L12 15L17 10"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};
