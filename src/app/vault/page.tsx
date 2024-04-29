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
      <div className="container mx-auto">
        <h1 className="mt-6 text-4xl font-bold">Your vaults</h1>
        <div className="flex justify-between items-end mt-6 mb-10">
          <div className="flex space-x-6">
            <div className="content-end">
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Search ID"
                />
                <div className="border-s-2 absolute px-4 inset-y-0 right-0 flex items-center">
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label>Sort by</label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <select
                  id="countries"
                  className="block w-full rounded-md border-0 py-2 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                >
                  <option selected>Newest to Oldest</option>
                  <option value="">Oldest to Newest</option>
                </select>
              </div>
            </div>

            <div>
              <label>Show</label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <select
                  id="countries"
                  className="block w-full rounded-md border-0 py-2 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                >
                  <option selected>All</option>
                  <option value="">Few</option>
                </select>
              </div>
            </div>
          </div>
          <Link
            href={"/vault/create"}
            className="px-5 py-2 border-[1px] rounded-3xl border-black"
          >
            Create a new vault
          </Link>
        </div>
        <UserVaultsTable />
      </div>
    </>
  );
}
