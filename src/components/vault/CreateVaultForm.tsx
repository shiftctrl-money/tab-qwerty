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
import { VAULT_MANAGER_CONFIG } from "@/app/helpers/index";
import toast from "react-hot-toast";

const cBtc = "0x5858c725d643Cde4Ec36e952cc965E4107898239";

export const CreateVaultForm = () => {
  const { address, isConnected } = useAccount();
  const [tab, setTab] = useState<string>();
  const [tabAmount, setTabAmount] = useState("0");
  const [reserveType, setReserveType] = useState(
    "0x6588b8894fca8cf664a5104c02483d947c24df3a4f2069053c798bcba9b23870"
  );
  const [reserveAmount, setReserveAmount] = useState("0");
  const {
    data: hash,
    error,
    writeContract,
    writeContractAsync,
  } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: iserror,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const { tabList: tabCount, error: tabCountError } = useTabCount();

  const balance = getBalanceOfToken(address as Address, cBtc);

  const rAmount = getAmountOut(cBtc, reserveAmount);

  const createVault = async () => {
    try {
      if (!address || !isConnected) {
        throw new Error("Please connect your wallet");
      }
      const tabAmountWei = parseEther(tabAmount);
      const balanceWei = balance ? parseEther(balance) : 0;

      if (!balance || balanceWei < tabAmountWei) {
        toast.error("Not enough token balance!");
        return;
      }
      if (!tab) {
        toast.error("Select tab token");
        return;
      }

      await writeContractAsync({
        abi: erc20Abi,
        address: cBtc,
        functionName: "approve",
        args: [VAULT_MANAGER_CONFIG.address, BigInt(rAmount.toString())],
      });

      toast.loading("Check your wallet to approve transaction");

      writeContract({
        ...VAULT_MANAGER_CONFIG,
        functionName: "createVault",
        args: [reserveType, rAmount, tab, tabAmountWei],
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
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
  useEffect(() => {
    if (isConfirmed) toast.success;
    toast.success("Transaction has been successfully completed.");
  }, [isConfirmed]);

  useEffect(() => {
    if (error || iserror) {
      console.log(error || iserror);
    }
  }, [error, iserror]);

  return (
    <>
      <div className="">
        <div className="py-2">
          <label className="text-sm font-medium">Reserve type</label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <select
              onChange={(e) =>
                setReserveType(keccak256(toBytes(e?.target.value)))
              }
              id="countries"
              className="block w-full rounded-xl border-0 py-2 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            >
              {" "}
              <option value={"CBTC"} selected>
                CBTC
              </option>
            </select>
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
            />
            <div className="absolute px-4 inset-y-0 right-0 flex items-center">
              cBTC
            </div>
          </div>
          <p className="text-sm my-4">Available: {balance ? balance : 0}</p>
        </div>
        <div className="py-2">
          <label className="text-sm font-medium">Tab currency</label>
          <div className="relative mt-2 rounded-md shadow-sm">
            {tabCount?.length > 0 ? (
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
            ) : (
              <p>Loading tab data....</p>
            )}
            {tabCountError && <p>Error: {tabCountError.message}</p>}
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
              className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="Enter a deposit amount"
            />
          </div>
        </div>
        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        <button
          onClick={createVault}
          className="mt-10 w-full bg-black text-white py-2 px-5 rounded-3xl"
        >
          Create vault
        </button>
      </div>
    </>
  );
};