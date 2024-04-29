"use client";
import Link from "next/link";
import { Tabs } from "flowbite-react";
import { customTabTheme } from "@/theme/CustomTabTheme";

export default function Home() {
  return (
    <>
      <section
        id="hero"
        className="h-screen p-8 flex justify-center items-center"
      >
        <div className="h-full bg-hero-img bg-contain bg-no-repeat bg-center w-full flex items-center rounded-xl">
          <div className="container mx-auto">
            <div className="mx-auto max-w-[780px] text-center text-white">
              <h1 className="mb-6 text-3xl font-bold leading-snug sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]">
                Your gateway to self sovereign money
              </h1>
              <p className="mx-auto mb-9 max-w-[600px] text-base font-medium sm:text-lg sm:leading-[1.44]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                convallis ante eros.
              </p>

              <button className="inline-flex items-center justify-center rounded-full bg-[#fff] px-7 py-[14px] text-center text-base font-medium text-[#000]">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-8 bg-[#F2F2F2] rounded-3xl mx-8">
        <h1 className="text-center text-2xl">Popular tab currencies</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4   justify-center p-12">
          <div className="bg-white p-3 rounded-3xl">
            <div className="max-w-full">
              <div className="bg-[#FB5108] p-5 rounded-3xl">
                <div className="relative">
                  <img src="/assets/coin.png" className="my-4" />
                  <div className="absolute top-0 left-0 w-full h-full bg-[#FB5108] opacity-50"></div>
                </div>
                <p className="text-white text-3xl">sUSD</p>
                <div className="flex mt-2">
                  <p className=" text-white">Sound United States Dollar</p>
                </div>
              </div>
              <div className="p-5">
                <div className="my-2">
                  <p className="text-black text-sm">Min. reserve ratio</p>
                  <p className="text-lg text-black font-medium">180% </p>
                </div>
                <div className="my-2">
                  <p className="text-black text-sm">Risk penalty</p>
                  <p className="text-lg text-black font-medium">2% per day </p>
                </div>
                <div className="my-2">
                  <p className="text-black text-sm">Liquidation ratio</p>
                  <p className="text-lg text-black font-medium">120% </p>
                </div>
                <div className="my-2">
                  <p className="text-black text-sm">BTC price</p>
                  <p className="text-lg text-black font-medium">
                    100,000.1234 sUSD
                  </p>
                </div>
                <div className="mt-8 mb-2 flex flex-col">
                  <Link
                    href={"vault/create"}
                    className="text-center w-100 bg-black text-white rounded-3xl py-3"
                  >
                    Create vault
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-3xl">
            <div className="max-w-full">
              <div className="bg-[#161616] p-5 rounded-3xl">
                <div className="relative">
                  <img src="/assets/coin.png" className="my-4" />
                  <div className="absolute top-0 left-0 w-full h-full bg-[#161616] opacity-50"></div>
                </div>
                <p className="text-white text-3xl">sUSD</p>
                <div className="flex mt-2">
                  <p className=" text-white">Sound United States Dollar</p>
                </div>
              </div>
              <div className="p-5">
                <div className="my-2">
                  <p className="text-black text-sm">Min. reserve ratio</p>
                  <p className="text-lg text-black font-medium">180% </p>
                </div>
                <div className="my-2">
                  <p className="text-black text-sm">Risk penalty</p>
                  <p className="text-lg text-black font-medium">2% per day </p>
                </div>
                <div className="my-2">
                  <p className="text-black text-sm">Liquidation ratio</p>
                  <p className="text-lg text-black font-medium">120% </p>
                </div>
                <div className="my-2">
                  <p className="text-black text-sm">BTC price</p>
                  <p className="text-lg text-black font-medium">
                    100,000.1234 sUSD
                  </p>
                </div>
                <div className="mt-8 mb-2 flex flex-col">
                  <Link
                    href={"vault/create"}
                    className="text-center w-100 bg-black text-white rounded-3xl py-3"
                  >
                    Create vault
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-3 rounded-3xl">
            <div className="max-w-full">
              <div className="bg-[#2B393B] p-5 rounded-3xl">
                <div className="relative">
                  <img src="/assets/coin.png" className="my-4" />
                  <div className="absolute top-0 left-0 w-full h-full bg-[#2B393B] opacity-50"></div>
                </div>
                <p className="text-white text-3xl">sUSD</p>
                <div className="flex mt-2">
                  <p className=" text-white">Sound United States Dollar</p>
                </div>
              </div>
              <div className="p-5">
                <div className="my-2">
                  <p className="text-black text-sm">Min. reserve ratio</p>
                  <p className="text-lg text-black font-medium">180% </p>
                </div>
                <div className="my-2">
                  <p className="text-black text-sm">Risk penalty</p>
                  <p className="text-lg text-black font-medium">2% per day </p>
                </div>
                <div className="my-2">
                  <p className="text-black text-sm">Liquidation ratio</p>
                  <p className="text-lg text-black font-medium">120% </p>
                </div>
                <div className="my-2">
                  <p className="text-black text-sm">BTC price</p>
                  <p className="text-lg text-black font-medium">
                    100,000.1234 sUSD
                  </p>
                </div>
                <div className="mt-8 mb-2 flex flex-col">
                  <Link
                    href={"vault/create"}
                    className="text-center w-100 bg-black text-white rounded-3xl py-3"
                  >
                    Create vault
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="p-12 mx-8">
        <div className="flex justify-end">
          <div className="absolute rounded-md shadow-sm max-w-sm">
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
        <Tabs theme={customTabTheme} aria-label="Pills" style="pills">
          <Tabs.Item active title="All Tabs">
            <TableContent />
          </Tabs.Item>
          <Tabs.Item title="Africa">
            <TableContent />
          </Tabs.Item>
          <Tabs.Item title="Asia">
            <TableContent />
          </Tabs.Item>
          <Tabs.Item title="Oceania">
            <TableContent />
          </Tabs.Item>
          <Tabs.Item title="North America">
            <TableContent />
          </Tabs.Item>
          <Tabs.Item title="South America">
            <TableContent />
          </Tabs.Item>
          <Tabs.Item title="Other">
            <TableContent />
          </Tabs.Item>
        </Tabs>
      </section>
    </>
  );
}

const TableContent = () => {
  return (
    <>
      <div className="flex justify-center border-2 rounded-2xl mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-8 text-base font-medium	">
                Tab Currency
              </th>
              <th scope="col" className="px-6 py-8 text-base font-medium">
                Code
              </th>
              <th scope="col" className="px-6 py-8 text-base font-medium">
                BTC price
              </th>
              <th scope="col" className="px-6 py-8 text-base font-medium">
                Min. reserve ratio
              </th>
              <th scope="col" className="px-6 py-8 text-base font-medium">
                Risk penalty
              </th>
              <th scope="col" className="px-6 py-8 text-base font-medium">
                Liquidation ratio
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => (
              <tr key={i} className="border-t-2">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src="/assets/coin.png" className="w-6" />
                    <p className="text-black">Sound United States Dollar</p>
                  </div>
                </td>
                <td className="px-6 py-4">sUSD</td>
                <td className="px-6 py-4">100,000.1234</td>
                <td className="px-6 py-4">180%</td>
                <td className="px-6 py-4">2% per day</td>
                <td className="px-6 py-4">120%</td>
                <td className="px-6 py-4">
                  <Link
                    href={"vault/create"}
                    className="text-center w-100 text-black border-b-2 border-black"
                  >
                    Create vault
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid justify-items-center py-10">
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
      </div>
    </>
  );
};
