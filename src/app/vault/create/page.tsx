import { CreateVaultCard } from "@/components/vault/CreateVaultCard";
import { CreateVaultForm } from "@/components/vault/CreateVaultForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShiftCtrl | Create Vault",
  description: "...",
};

export default function CreateVault() {
  return (
    <>
      <div className="container mx-auto min-h-[80vh] my-10">
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
              Use the simulation on the right to determine the ideal
              configuration for you.
            </p>
            <CreateVaultForm />
          </div>
          <CreateVaultCard />
        </div>
      </div>
    </>
  );
}