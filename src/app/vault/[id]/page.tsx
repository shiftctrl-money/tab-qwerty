"use client";
import { customTabTheme, dpCustomTheme } from "@/theme/CustomTabTheme";
import { CustomFlowbiteTheme, Datepicker, Select, Tabs } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SingleVault() {
  const router = useRouter();

  return (
    <>
      <div className="container mx-auto min-h-[80vh] my-10">
        <div className="py-2">
          <button
            onClick={() => router.push("/vault")}
            className="border rounded-full border-black p-6"
          >
            <ArrowIcon />
          </button>
        </div>
        <h1 className="mt-6 text-4xl font-bold">sUSD vault #12345678</h1>
        <div className="grid grid-cols-1 gap-4">
          <div className="col-start-1 col-span-2">
            <Tabs
              className="my-6"
              theme={customTabTheme}
              aria-label="Pills"
              style="pills"
            >
              <Tabs.Item active title="Manage">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F2F2F2] p-4 rounded-3xl justify-center">
                  <div className="bg-white p-3 rounded-3xl">
                    <div className="max-w-full">
                      <div className="bg-[#708395] p-5 rounded-3xl">
                        <p className="text-white">Reserve Ratio</p>
                        <div className="flex mt-2">
                          <p className="text-3xl text-white">257.38% </p>
                          <span className="my-auto ml-3">
                            <VerifiedCheckIcon />
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="my-2">
                          <p className="text-black text-sm">Reserve Ratio</p>
                          <p className="text-lg text-black font-medium">
                            257.38%{" "}
                          </p>
                        </div>
                        <div className="my-2">
                          <p className="text-black text-sm">Risk penalty</p>
                          <p className="text-lg text-black font-medium">
                            2% per day{" "}
                          </p>
                        </div>
                        <div className="my-2">
                          <p className="text-black text-sm">
                            Liquidation ratio
                          </p>
                          <p className="text-lg text-black font-medium">
                            120%{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-3xl">
                    <div className="max-w-full">
                      <div className="bg-[#FB5108] p-5 rounded-3xl">
                        <p className="text-white">Liquidation price</p>
                        <div className="mt-2">
                          <p className="text-3xl text-white">
                            12,000.1234 sUSD
                          </p>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="my-2">
                          <p className="text-black text-sm">BTC price</p>
                          <p className="text-lg text-black font-medium">
                            25,738 sUSD
                          </p>
                        </div>
                        <div className="my-2">
                          <p className="text-black text-sm">Reserves</p>
                          <p className="text-lg text-black font-medium">
                            1.1234 wBTC
                          </p>
                        </div>
                        <div className="my-2">
                          <p className="text-black text-sm">Reserve value</p>
                          <p className="text-lg text-black font-medium">
                            25,738 sUSD
                          </p>
                        </div>
                        <div className="mt-8 mb-2 flex flex-col">
                          <Link
                            href={"12345678/deposit"}
                            className="text-center w-100 bg-black text-white rounded-3xl py-3"
                          >
                            Deposit reserves
                          </Link>
                        </div>
                        <div className="my-3">
                          <div className="text-center">
                            <Link
                              href={"12345678/withdraw"}
                              className="border-b-2 border-black pb-1"
                            >
                              Withdraw reserves
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-3xl">
                    <div className="max-w-full">
                      <div className="bg-[#695D5A] p-5 rounded-3xl">
                        <p className="text-white">Outstanding tabs</p>
                        <div className="mt-2">
                          <p className="text-3xl text-white">
                            10,000.1234 sUSD
                          </p>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="my-2">
                          <p className="text-black text-sm">Minted tabs</p>
                          <p className="text-lg text-black font-medium">
                            10,000 sUSD
                          </p>
                        </div>
                        <div className="my-2">
                          <p className="text-black text-sm">Risk penalty</p>
                          <p className="text-lg text-black font-medium">
                            0 sUSD
                          </p>
                        </div>
                        <div className="mt-[25%]">
                          <div className="mt-8 mb-2 flex flex-col">
                            <Link
                              href={"12345678/burn-tabs"}
                              className="text-center w-100 bg-black text-white rounded-3xl py-3"
                            >
                              Burn tabs
                            </Link>
                          </div>
                          <div className="my-3">
                            <div className="text-center">
                              <Link
                                href="12345678/mint-tabs"
                                className="border-b-2 border-black pb-1"
                              >
                                Mint Tabs
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.Item>
              <Tabs.Item title="History">
                <TableContent />
              </Tabs.Item>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

const TableContent = () => {
  return (
    <>
      <div className="">
        <div className="flex justify-between items-end mb-10">
          <div className="flex space-x-6">
            <div>
              <label>Sort By</label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <Datepicker
                  theme={dpCustomTheme}
                  weekStart={1} // Monday
                />
              </div>
            </div>
            <div>
              <label>Sort by</label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <Select id="short" required>
                  <option>Newest to oldest</option>
                  <option>Oldest to newest</option>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="odd:bg-[#F9F9F9] even:bg-white ">
              <td className="px-6 py-4">
                <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                  <p className="mx-auto text-center text-black">
                    13 June 2023, 1:23am
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <Link
                  href="#"
                  className="border-black border-b-2 text-black pb-1"
                >
                  View on zkscan
                </Link>
              </td>
              <td className="px-6 py-4">
                <p className="text-black py-2">Liquidation auction concluded</p>
              </td>
              <td className="px-6 py-4">-</td>
            </tr>
            <tr className="odd:bg-[#F9F9F9] even:bg-white ">
              <td className="px-6 py-4">
                <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                  <p className="mx-auto text-center text-black">
                    13 June 2023, 1:23am
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <Link
                  href="#"
                  className="border-black border-b-2 text-black pb-1"
                >
                  View on zkscan
                </Link>
              </td>
              <td className="px-6 py-4">
                <p className="text-black py-2">Liquidation auction concluded</p>
              </td>
              <td className="px-6 py-4">-</td>
            </tr>
            <tr className="odd:bg-[#F9F9F9] even:bg-white ">
              <td className="px-6 py-4">
                <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                  <p className="mx-auto text-center text-black">
                    13 June 2023, 1:23am
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <Link
                  href="#"
                  className="border-black border-b-2 text-black pb-1"
                >
                  View on zkscan
                </Link>
              </td>
              <td className="px-6 py-4">
                <p className="py-2 text-black">Deposit reserves </p>
                <p className="py-2 text-black">Mint tabs</p>
              </td>
              <td className="px-6 py-4">
                <p className="py-2 text-black">0.123456789012345678 wBTC</p>
                <p className="py-2 text-black">
                  10,000.123456789012345678 sUSD
                </p>
              </td>
            </tr>
            <tr className="odd:bg-[#F9F9F9] even:bg-white ">
              <td className="px-6 py-4">
                <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                  <p className="mx-auto text-center text-black">
                    13 June 2023, 1:23am
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <Link
                  href="#"
                  className="border-black border-b-2 text-black pb-1"
                >
                  View on zkscan
                </Link>
              </td>
              <td className="px-6 py-4">
                <p className="py-2 text-black">Deposit reserves </p>
              </td>
              <td className="px-6 py-4">
                <p className="py-2 text-black">0.123456789012345678 wBTC</p>
              </td>
            </tr>
            <tr className="odd:bg-[#F9F9F9] even:bg-white ">
              <td className="px-6 py-4">
                <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                  <p className="mx-auto text-center text-black">
                    13 June 2023, 1:23am
                  </p>
                </div>
              </td>
              <td className="px-6 py-4">
                <Link
                  href="#"
                  className="border-black border-b-2 text-black pb-1"
                >
                  View on zkscan
                </Link>
              </td>
              <td className="px-6 py-4">
                <p className="py-2 text-black">Create vault</p>
                <p className="py-2 text-black">Deposit reserves</p>
                <p className="py-2 text-black">Mint tabs</p>
              </td>
              <td className="px-6 py-4">
                <p className="py-2 text-black">vault 12345678</p>
                <p className="py-2 text-black">0.123456789012345678 wBTC</p>
                <p className="py-2 text-black">
                  10,000.123456789012345678 sUSD
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div className="grid justify-items-center py-10">
        <div className="flex items-center gap-4">
          <button
            className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none   text-center align-middle transition-all"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                width="17"
                height="22"
                viewBox="0 0 17 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.90674 2.18555L1.90674 20.1855"
                  stroke="#CACACA"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
                <path
                  d="M8.02908 10.9866L15.7345 3.28122C15.9649 3.05079 16.0825 2.7651 16.0872 2.42415C16.0919 2.0832 15.9791 1.79388 15.7486 1.5562C15.5015 1.3091 15.2052 1.18555 14.8595 1.18555C14.5138 1.18555 14.2222 1.3091 13.9845 1.5562L5.91493 9.5975C5.71783 9.7946 5.57417 10.0131 5.48396 10.2529C5.39374 10.4928 5.34863 10.7374 5.34863 10.9866C5.34863 11.2359 5.39374 11.4805 5.48396 11.7203C5.57417 11.9602 5.71783 12.1787 5.91493 12.3758L13.9954 20.4562C14.2425 20.7033 14.5323 20.8227 14.8649 20.8144C15.1975 20.806 15.4874 20.6783 15.7345 20.4312C15.9649 20.1841 16.0843 19.8943 16.0927 19.5616C16.101 19.229 15.9816 18.9392 15.7345 18.6921L8.02908 10.9866Z"
                  fill="#CACACA"
                />
              </svg>
            </span>
          </button>
          <button
            disabled
            className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none   text-center align-middle transition-all"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                width="11"
                height="20"
                viewBox="0 0 11 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.68045 9.8011L10.3859 2.09568C10.6163 1.86524 10.7339 1.57955 10.7386 1.2386C10.7433 0.89765 10.6304 0.608333 10.4 0.37065C10.1529 0.12355 9.85652 0 9.51087 0C9.16521 0 8.87353 0.12355 8.63585 0.37065L0.566299 8.41195C0.369199 8.60905 0.225541 8.82753 0.135324 9.0674C0.0451074 9.30725 0 9.55182 0 9.8011C0 10.0504 0.0451074 10.295 0.135324 10.5348C0.225541 10.7747 0.369199 10.9932 0.566299 11.1903L8.64672 19.2707C8.89382 19.5178 9.18368 19.6372 9.5163 19.6288C9.84892 19.6205 10.1388 19.4928 10.3859 19.2457C10.6163 18.9986 10.7357 18.7087 10.744 18.3761C10.7524 18.0435 10.633 17.7536 10.3859 17.5065L2.68045 9.8011Z"
                  fill="#CACACA"
                />
              </svg>
            </span>
          </button>
          <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
            Page <strong className="text-gray-900"> 1 </strong> of
            <strong className="text-gray-900"> 10</strong>
          </p>
          <button
            className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none   text-center align-middle transition-all"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                width="11"
                height="20"
                viewBox="0 0 11 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.06398 9.8011L0.358558 2.09568C0.128125 1.86524 0.0105494 1.57955 0.00583268 1.2386C0.00113268 0.89765 0.114 0.608333 0.344433 0.37065C0.591533 0.12355 0.887908 0 1.23356 0C1.57922 0 1.8709 0.12355 2.10858 0.37065L10.1781 8.41195C10.3752 8.60905 10.5189 8.82753 10.6091 9.0674C10.6993 9.30725 10.7444 9.55182 10.7444 9.8011C10.7444 10.0504 10.6993 10.295 10.6091 10.5348C10.5189 10.7747 10.3752 10.9932 10.1781 11.1903L2.09771 19.2707C1.85061 19.5178 1.56075 19.6372 1.22813 19.6288C0.895516 19.6205 0.605658 19.4928 0.358558 19.2457C0.128125 18.9986 0.00874114 18.7087 0.000407803 18.3761C-0.00792553 18.0435 0.111458 17.7536 0.358558 17.5065L8.06398 9.8011Z"
                  fill="#CACACA"
                />
              </svg>
            </span>
          </button>
          <button
            className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none   text-center align-middle transition-all"
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.0933 3.18555L19.0933 21.1855"
                  stroke="#CACACA"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
                <path
                  d="M12.9709 11.9866L5.26549 4.28122C5.03506 4.05079 4.91748 3.7651 4.91277 3.42415C4.90807 3.0832 5.02093 2.79388 5.25137 2.5562C5.49847 2.3091 5.79484 2.18555 6.14049 2.18555C6.48616 2.18555 6.77783 2.3091 7.01552 2.5562L15.0851 10.5975C15.2822 10.7946 15.4258 11.0131 15.516 11.2529C15.6063 11.4928 15.6514 11.7374 15.6514 11.9866C15.6514 12.2359 15.6063 12.4805 15.516 12.7203C15.4258 12.9602 15.2822 13.1787 15.0851 13.3758L7.00464 21.4562C6.75754 21.7033 6.46768 21.8227 6.13507 21.8144C5.80245 21.806 5.51259 21.6783 5.26549 21.4312C5.03506 21.1841 4.91568 20.8943 4.90734 20.5616C4.89901 20.229 5.01839 19.9392 5.26549 19.6921L12.9709 11.9866Z"
                  fill="#CACACA"
                />
              </svg>
            </span>
          </button>
        </div>
      </div> */}
    </>
  );
};

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
