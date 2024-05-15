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
        <CreateVaultForm />
      </div>
    </>
  );
}
