"use client";
import { useAccount, useClient, useWriteContract,useWaitForTransactionReceipt  } from "wagmi";
import abi from "@/app/helpers/ProtocolVault.json";
import getAllTabs from "@/hooks/getAllTabs"
import { ethers, isError } from "ethers";
import { useEffect, useState } from "react";
import { useEthersSigner } from "@/utils/useEthersSigner";
import { decodeAbiParameters, encodePacked, erc20Abi, formatEther, keccak256, parseEther, parseUnits, toBytes, toHex } from "viem";
import getAmountOut from "@/hooks/getAmountOut"
import getBalanceOfToken from "@/hooks/getBalanceOfToken"
import TabCount from "@/hooks/getTabCount"

import {VAULT_MANAGER_CONFIG,TOKEN_CONFIG} from "@/app/helpers/index"
import Swal from 'sweetalert2'
export const CreateVaultForm = () => {
  const { address, isConnected } = useAccount();

  const [tab, setTab] = useState();
  const [tabAmount, setTabAmount] = useState("0");
const [reserveType,setReserveType] = useState("0x6588b8894fca8cf664a5104c02483d947c24df3a4f2069053c798bcba9b23870")
const [reserveAmount, setReserveAmount] = useState("0")

const {data:hash,error,writeContract, writeContractAsync} = useWriteContract()
const { isLoading: isConfirming, isSuccess: isConfirmed,error:iserror } = 
useWaitForTransactionReceipt({ 
  hash
}) 

let wBtc = "0x5858c725d643Cde4Ec36e952cc965E4107898239"

const balance = getBalanceOfToken(address,wBtc)

let rAmount =  getAmountOut(wBtc,reserveAmount)
let tabCount = TabCount() || [];
console.log(tabCount)

console.log(rAmount)

  const createVault = async () =>  {

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
    console.log(tabAmount,reserveType)
    let tab_amount  =  parseEther(tabAmount)
    console.log(tab_amount,rAmount)
    if(1e18*Number(balance) < Number(rAmount)) {
      
throw new Error("Not enough token balance!");
      
    }
    if(!tab) throw new Error("Select tab token");

    await writeContractAsync({
      abi:erc20Abi,
      address:wBtc,
      functionName:"approve",
      args:[VAULT_MANAGER_CONFIG.address, rAmount.toString()]
    })
    Swal.fire({

      title:"Check your wallet to approve transaction",
      didOpen: () => {
        Swal.showLoading();
      
      },
    })
    console.log(tab)
writeContract({
  ...VAULT_MANAGER_CONFIG,
  functionName:"createVault",
  args:[reserveType,rAmount,tab,tab_amount]
})
}catch(err){
  console.log(err)

  Swal.fire({
    icon: "error",
    // title: "Something went wrong",
    text: err?.shortMessage || err?.message|| "Something went wrong, please check your network or try again later.",
    // footer: '<a href="#">Why do I have this issue?</a>'
  });

}

  }; 
  function bytes3ToString(bytes3Hex) {
    // Remove '0x' prefix if present
    if (bytes3Hex.startsWith('0x')) {
        bytes3Hex = bytes3Hex.slice(2);
    }
    
    // Split the hexadecimal string into pairs of characters (bytes)
    const pairs = bytes3Hex.match(/.{1,2}/g);
    
    // Convert each pair of characters to its corresponding byte
    const bytes = pairs.map(pair => parseInt(pair, 16));

    // Convert bytes to string
    let result = '';
    for (let i = 0; i < bytes.length; i++) {
        result += String.fromCharCode(bytes[i]);
    }
    return result;
}
useEffect(()=>{
  if(isConfirmed)Swal.fire({
    
    icon: "success",
    title: "Transaction has been successfully completed.",
    showConfirmButton: false,
    timer: 1500
  });
},[isConfirmed])
useEffect(()=>{

  if(error){
console.log(error)
  } else if (isError){
console.log(isError)
  }
},[isError,error])
// const tabs  = getAllTabs() 
// console.log(tabs)
  return (
    <>
      <div className="">
        <div className="py-2">
          <label className="text-sm font-medium">Reserve type</label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <select
            onChange={(e)=> setReserveType(keccak256(toBytes(e?.target.value)))}
              id="countries"
              className="block w-full rounded-xl border-0 py-2 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            >
              {" "}
      
              <option  value={"CBTC"}  selected >CBTC</option>
            
            </select>
          </div>
        </div>
        <div className="py-2">
          <label className="text-sm font-medium">Reserve amount</label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
            onChange={e=>setReserveAmount(e.currentTarget.value)}
              type="number"
              name="price"
              id="price"
              className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="Enter a deposit amount"
            />
            <div className="absolute px-4 inset-y-0 right-0 flex items-center">
              wBTC
            </div>
          </div>
          <p className="text-sm my-4">Available: {balance}</p>
        </div>
        <div className="py-2">
          <label className="text-sm font-medium">Tab currency</label>
          <div className="relative mt-2 rounded-md shadow-sm">
           { tabCount?.length > 0 ? <select
            onChange={(e)=>setTab(e.target.value)}
              id="countries"
              className="block w-full rounded-xl border-0 py-2 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            >
               <option value="000" selected></option>
              {
                tabCount?.map(item=>  {return <option value={item} >{bytes3ToString(item)}</option>}

                )
              }
             
                
            </select>
          : "Loading tab data...." 
          }
          </div>
        </div>

        <div className="py-2">
          <label className="text-sm font-medium">Tab amount</label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input onChange={e=> setTabAmount(e?.currentTarget.value)}
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
