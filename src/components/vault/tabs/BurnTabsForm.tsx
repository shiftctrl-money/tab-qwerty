import { PROTOCOL_VAULT_CONTRACT } from "@/app/helpers";
import abi from "@/app/helpers/ProtocolVault.json";
import { ethers } from "ethers";
import { useEthersSigner } from "@/utils/useEthersSigner";
import { useAccount } from "wagmi";
import { useState } from "react";

export const BurnTabsForm = () => {
  const { address, isConnected } = useAccount();
  // const signer = useEthersSigner();
  const [collAddress, setCollAddress] = useState<string>();
  const [tabAddress, setTabAddress] = useState<string>();
  const [collAmount, setCollAmount] = useState<number>();

  const burnTabs = async () => {
    if (!address || !isConnected) {
      alert("Please connect your wallet");
      return;
    }

    console.log(tx);
  };

  return (
    <div>
      <label className="text-sm font-medium">Burn amount</label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-xl border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          placeholder="Enter a deposit amount"
        />
        <div className="absolute px-4 inset-y-0 right-0 flex items-center">
          cBTC
        </div>
      </div>
      <p className="text-sm my-4">Available: 2.123456789012345678</p>
      <button
        onClick={burnTabs}
        className="mt-10 w-full bg-black text-white py-2 px-5 rounded-3xl"
      >
        Burn tabs
      </button>
    </div>
  );
};
