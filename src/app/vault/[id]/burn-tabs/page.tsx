"use client";
import getAmountOut from "@/hooks/getAmountOut";
import getBalanceOfToken from "@/hooks/getBalanceOfToken";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import Swal from 'sweetalert2'
import { VAULT_MANAGER_CONFIG } from "@/app/helpers";
import { erc20Abi, formatEther, parseEther } from "viem";
import getVaultData from "@/hooks/getVaultData";
import getTokenName from "@/hooks/getTokenName";

export default function Deposit({params}) {
  console.log(params.id)
  let {id} =params;
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
const [reserveAmount,setReserveAmount] =useState("0")

const { address, isConnected } = useAccount();

const {data:hash,error,writeContract, writeContractAsync} = useWriteContract()
const { isLoading: isConfirming, isSuccess: isConfirmed,error:iserror } = 
useWaitForTransactionReceipt({ 
  hash
}) 

  
let wBtc = "0x5858c725d643Cde4Ec36e952cc965E4107898239"
let rAmount =  getAmountOut(wBtc,reserveAmount)



const data = getVaultData(address,id)||[]
console.log(data)
const balance = getBalanceOfToken(address,data[2])

const tokenName = getTokenName(data[2])
console.log(tokenName)
console.log(error)
const handleBurn= async () =>  {

  try{

Swal.fire({

  title:"Check your wallet to approve transaction",
  didOpen: () => {
    Swal.showLoading();
  
  },
})
  if (!address || !isConnected) {
    alert("Please connect your wallet");
    return;
  }

  

  await writeContractAsync({
    abi:erc20Abi,
    address:data[2],
    functionName:"approve",
    args:[VAULT_MANAGER_CONFIG.address, rAmount.toString()]
  })
writeContract({
...VAULT_MANAGER_CONFIG,
functionName:"adjustTab",
args:[id,rAmount,false]
})
}catch(err){
console.log(err)
Swal.fire({
  icon: "error",
  title: "Something went wrong",
  text: err?.shortMessage || err?.message,
  footer: '<a href="#">Why do I have this issue?</a>'
});}

}; 
useEffect(()=>{
  if(isConfirmed){setOpen(true); Swal.close(); }
},[isConfirmed])
  return (
    <>
      <div className="container mx-auto min-h-[80vh] my-10">
        <div className="py-2">
          <button
            onClick={() => router.back()}
            className="border rounded-full border-black p-6"
          >
            <ArrowIcon />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-16">
          <div className="col-span-2">
            <h1 className="mt-6 text-4xl font-bold">Burn tab</h1>
            <p className="mt-3 mb-10 text-sm">
              Use the simulation on the right to determine the ideal burn
              amount for you.
            </p>
            <div>
              <label className="text-sm font-medium">Burn amount</label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="Number"
                  onChange={(e)=> setReserveAmount(e.currentTarget.value)}
                  name="price"
                  id="price"
                  className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Enter a burn amount"
                />
                <div className="absolute px-4 inset-y-0 right-0 flex items-center">
                  wBTC
                </div>
              </div>
              <p className="text-sm my-4">Available For Burn:   {balance} {tokenName} </p>
              <button
                onClick={handleBurn}
                className="mt-10 w-full bg-black text-white py-2 px-5 rounded-3xl"
              >
                Burn tab
              </button>
            </div>
          </div>
          <div className="col-span-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F2F2F2] p-4 rounded-3xl justify-center">
              <div className="bg-white p-3 rounded-3xl">
                <div className="max-w-sm">
                  <div className="bg-[#708395] p-5 rounded-3xl">
                    <p className="text-white text-sm">Reserve Ratio</p>
                    <div className="flex mt-2">
                      <p className="text-2xl text-white">257.38% </p>
                      <span className="my-auto ml-3">
                        <VerifiedCheckIcon />
                      </span>
                    </div>
                    <p className="text-normal text-white mt-2 text-sm">
                      currently 190.05%{" "}
                    </p>
                  </div>
                  <div className="p-5">
                    <div className="my-4">
                      <p className="text-black text-sm">Min. Reserve Ratio</p>
                      <p className="text-lg text-black font-medium">180% </p>
                    </div>
                    <div className="my-4">
                      <p className="text-black text-sm">Risk penalty</p>
                      <p className="text-lg text-black font-medium">
                        2% per day{" "}
                      </p>
                    </div>
                    <div className="my-4">
                      <p className="text-black text-sm">Liquidation ratio</p>
                      <p className="text-lg text-black font-medium">120% </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 rounded-3xl">
                <div className="max-w-sm">
                  <div className="bg-[#FB5108] p-5 rounded-3xl">
                    <p className="text-white text-sm">Liquidation price</p>
                    <div className="mt-2">
                      <p className="text-2xl text-white">12,000.1234 sUSD</p>
                    </div>
                    <p className="text-normal text-sm text-white mt-2">
                      currently: 11,500.0000 sUSD{" "}
                    </p>
                  </div>
                  <div className="p-5">
                    <div className="my-4">
                      <p className="text-black text-sm">BTC price</p>
                      <p className="text-lg text-black font-medium">
                        25,738 sUSD
                      </p>
                    </div>
                    <div className="my-4">
                      <p className="text-black text-sm">Tab</p>
                      <p className="text-lg text-black font-medium">
                       { formatEther(data?.[3]||"0") } sUSD
                      </p>
                      <p className="text-black text-sm">
                        Currently: 30,000.1234 sUSD
                      </p>
                    </div>
                    <div className="my-4">
                      <p className="text-black text-sm">Reserve</p>
                      <p className="text-lg text-black font-medium">
                      { formatEther(data?.[1]||"0") } wBTC
                      </p>
                      <p className="text-black text-sm">
                        Currently:  { formatEther(data?.[1]||"0") } wBTC
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 rounded-3xl">
                <div className="max-w-sm">
                  <div className="bg-[#695D5A] p-5 rounded-3xl">
                    <p className="text-white text-sm">Outstanding tabs</p>
                    <div className="mt-2">
                      <p className="text-2xl text-white">10,000.1234 sUSD</p>
                    </div>
                    <p className="text-white mt-2 text-sm">
                      Currently: 11,500.0000 sUSD
                    </p>
                  </div>
                  <p className="text-white">Currently: 11,500.0000 sUSD</p>
                  <div className="p-5">
                    <div className="my-4">
                      <p className="text-black text-sm">Minted tabs</p>
                      <p className="text-lg text-black font-medium">
                        10,000 sUSD
                      </p>
                      <p className="text-black text-sm">
                        Currently: 10,000.1234 sUSD
                      </p>
                    </div>
                    <div className="my-4">
                      <p className="text-black text-sm">Risk penalty</p>
                      <p className="text-lg text-black font-medium">0 sUSD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                      href="#"
                      className="bg-black py-2 px-4 text-white rounded-3xl"
                      type="button"
                    >
                      Go to vault
                    </Link>
                  </div>
                  <div className="flex justify-center my-2">
                    <button
                      className="text-black border-b-2 border-black"
                      onClick={() => setOpen(false)}
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