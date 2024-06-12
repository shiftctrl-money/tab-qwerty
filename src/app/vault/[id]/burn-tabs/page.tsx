"use client";
import getAmountOut from "@/hooks/getAmountOut";
import getBalanceOfToken from "@/hooks/getBalanceOfToken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { VAULT_MANAGER_CONFIG } from "@/app/helpers";
import { Address, erc20Abi, formatEther } from "viem";
import getVaultData from "@/hooks/getVaultData";
import getTokenName from "@/hooks/getTokenName";
import toast from "react-hot-toast";
import { VaultSubPagesCard } from "@/components/vault/VaultSubPagesCard";
import { publicClient } from "@/utils/viemConfig";

export default function Deposit({ params }: { params: any }) {
  let { id } = params;
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [reserveAmount, setReserveAmount] = useState("0");

  const { address, isConnected } = useAccount();

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

  let cBTC = "0x5858c725d643Cde4Ec36e952cc965E4107898239";
  let rAmount = getAmountOut(cBTC, reserveAmount);

  const data: any = getVaultData(address, id) || [];
  const balance = getBalanceOfToken((address as Address) || "", data[2]);
  const tokenName = getTokenName(data[2]);

  const handleBurn = async () => {
    try {
      if (!address || !isConnected) {
        toast.error("Please connect your wallet");
        return;
      }
      toast.loading("Check your wallet to approve transaction");
      const allowance = await publicClient.readContract({
        abi: erc20Abi,
        address: data[2],
        functionName: "allowance",
        args: [address, VAULT_MANAGER_CONFIG.address],
      });
      if (allowance < Number(rAmount)) {
        await writeContractAsync({
          abi: erc20Abi,
          address: data[2],
          functionName: "approve",
          args: [VAULT_MANAGER_CONFIG.address, BigInt(2 ^ 53)],
        });
      }
      writeContract({
        ...VAULT_MANAGER_CONFIG,
        functionName: "adjustTab",
        args: [id, rAmount, false],
      });
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (isConfirmed) {
      toast.dismiss();
      setOpen(true);
    }
  }, [isConfirmed]);
  useEffect(() => {
    if (error || iserror) {
      console.log(error || iserror);
      toast.dismiss();
      toast.error("Something Went wrong");
    }
  }, [error, iserror]);
  return (
    <>
      <div className="container mx-auto min-h-[80vh] my-10 p-4 lg:p-0">
        <div className="py-2">
          <button
            onClick={() => router.back()}
            className="border rounded-full border-black p-4 lg:p-6"
          >
            <ArrowIcon />
          </button>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-7 lg:gap-16">
          <div className="w-full lg:col-span-2">
            <h1 className="mt-6 text-3xl lg:text-4xl font-bold">Burn tab</h1>
            <p className="mt-3 mb-10 text-sm">
              Use the simulation on the right to determine the ideal burn amount
              for you.
            </p>
            <div>
              <label className="text-sm font-medium">Burn amount</label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="Number"
                  onChange={(e) => setReserveAmount(e.currentTarget.value)}
                  name="price"
                  id="price"
                  className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Enter a burn amount"
                  value={reserveAmount}
                />
                <div className="absolute px-4 inset-y-0 right-0 flex items-center">
                  {tokenName}
                </div>
              </div>
              <div className="mx-auto flex justify-between items-center">
                <p className="text-sm my-4">
                  Available: {balance} {tokenName}
                </p>
                <button
                  className="underline"
                  onClick={() => setReserveAmount(balance!)}
                >
                  Max
                </button>
              </div>
              <button
                onClick={handleBurn}
                className="mt-10 w-full bg-black text-white py-2 px-5 rounded-3xl"
              >
                Burn tab
              </button>
            </div>
          </div>
          <div className="w-full lg:col-span-5 mt-10 lg:mt-0">
            <VaultSubPagesCard id={id} />
          </div>
        </div>
      </div>

      {open ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/3 h-1/3 my-6 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-12">
                <div className="relative p-6 flex-auto mt-12">
                  <p className="my-4 text-blueGray-500 text-2xl text-center font-bold">
                    Tabs have been burn successfully
                  </p>
                  <p className="my-4 text-blueGray-500 text-base leading-relaxed text-center">
                    Lorem ipsum dolor sit amet
                  </p>
                </div>
                <div className="items-center rounded-b">
                  <div className="flex justify-center my-2">
                    <Link
                      href={`/vault/${id}`}
                      className="bg-black py-2 px-4 text-white rounded-3xl"
                      type="button"
                    >
                      Go to vault
                    </Link>
                  </div>
                  <div className="flex justify-center my-2">
                    <button
                      className="text-black border-b-2 border-black"
                      onClick={() => {
                        setOpen(false);
                        window.location.reload();
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

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
