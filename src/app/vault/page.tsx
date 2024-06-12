import { UserVaultsTable } from "@/components/vault/UserVaultsTable";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShiftCtrl | User Vaults",
  description: "...",
};
export default function UserVault() {
  return (
    <>
      <main className="min-h-[90vh]">
        <div className="container mx-auto">
          <h1 className="mt-6 text-4xl font-bold">Your vaults</h1>
          <UserVaultsTable />
        </div>
      </main>
    </>
  );
}
