import backArrow from "@/../public/icons/back-arrow-line.svg";
import Link from "next/link";

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
          <button className="px-5 py-2 border-[1px] rounded-3xl border-black">
            Create a new vault
          </button>
        </div>
        <div className="flex justify-center">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-base font-medium font-medium	"
                >
                  Vault ID
                </th>
                <th scope="col" className="px-6 py-3 text-base font-medium">
                  Tab currency
                </th>
                <th scope="col" className="px-6 py-3 text-base font-medium">
                  Reserve ratio
                </th>
                <th scope="col" className="px-6 py-3 text-base font-medium">
                  Liquidation price
                </th>
                <th scope="col" className="px-6 py-3 text-base font-medium">
                  Outstanding tabs
                </th>
                <th scope="col" className="px-6 py-3 text-base font-medium">
                  Reserves
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-[#F9F9F9] even:bg-white ">
                <td className="px-6 py-4">
                  <Link href={"/vault/123456"}>
                    <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                      <p className="mx-auto text-center text-black">
                        #12345678
                      </p>
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4">Sounds United States Dollar</td>
                <td className="px-6 py-4">270%</td>
                <td className="px-6 py-4">50,000.00 sUSD</td>
                <td className="px-6 py-4">100,000.00 sUSD</td>
                <td className="px-6 py-4">10.0000000000 wBTC</td>
              </tr>
              <tr className="odd:bg-[#F9F9F9] even:bg-white rounded-xl">
                <td className="px-6 py-4">
                  <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                    <p className="mx-auto text-center text-black">#12345678</p>
                  </div>
                </td>
                <td className="px-6 py-4">Sounds United States Dollar</td>
                <td className="px-6 py-4">270%</td>
                <td className="px-6 py-4">50,000.00 sUSD</td>
                <td className="px-6 py-4">100,000.00 sUSD</td>
                <td className="px-6 py-4">10.0000000000 wBTC</td>
              </tr>
              <tr className="odd:bg-[#F9F9F9] even:bg-white rounded-xl">
                <td className="px-6 py-4">
                  <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                    <p className="mx-auto text-center text-black">#12345678</p>
                  </div>
                </td>
                <td className="px-6 py-4">Sounds United States Dollar</td>
                <td className="px-6 py-4">270%</td>
                <td className="px-6 py-4">50,000.00 sUSD</td>
                <td className="px-6 py-4">100,000.00 sUSD</td>
                <td className="px-6 py-4">10.0000000000 wBTC</td>
              </tr>
              <tr className="odd:bg-[#F9F9F9] even:bg-white rounded-xl">
                <td className="px-6 py-4">
                  <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                    <p className="mx-auto text-center text-black">#12345678</p>
                  </div>
                </td>
                <td className="px-6 py-4">Sounds United States Dollar</td>
                <td className="px-6 py-4">270%</td>
                <td className="px-6 py-4">50,000.00 sUSD</td>
                <td className="px-6 py-4">100,000.00 sUSD</td>
                <td className="px-6 py-4">10.0000000000 wBTC</td>
              </tr>
              <tr className="odd:bg-[#F9F9F9] even:bg-white rounded-xl">
                <td className="px-6 py-4">
                  <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                    <p className="mx-auto text-center text-black">#12345678</p>
                  </div>
                </td>
                <td className="px-6 py-4">Sounds United States Dollar</td>
                <td className="px-6 py-4">270%</td>
                <td className="px-6 py-4">50,000.00 sUSD</td>
                <td className="px-6 py-4">100,000.00 sUSD</td>
                <td className="px-6 py-4">10.0000000000 wBTC</td>
              </tr>
              <tr className="odd:bg-[#F9F9F9] even:bg-white rounded-xl">
                <td className="px-6 py-4">
                  <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                    <p className="mx-auto text-center text-black">#12345678</p>
                  </div>
                </td>
                <td className="px-6 py-4">Sounds United States Dollar</td>
                <td className="px-6 py-4">270%</td>
                <td className="px-6 py-4">50,000.00 sUSD</td>
                <td className="px-6 py-4">100,000.00 sUSD</td>
                <td className="px-6 py-4">10.0000000000 wBTC</td>
              </tr>
              <tr className="odd:bg-[#F9F9F9] even:bg-white rounded-xl">
                <td className="px-6 py-4">
                  <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                    <p className="mx-auto text-center text-black">#12345678</p>
                  </div>
                </td>
                <td className="px-6 py-4">Sounds United States Dollar</td>
                <td className="px-6 py-4">270%</td>
                <td className="px-6 py-4">50,000.00 sUSD</td>
                <td className="px-6 py-4">100,000.00 sUSD</td>
                <td className="px-6 py-4">10.0000000000 wBTC</td>
              </tr>
              <tr className="odd:bg-[#F9F9F9] even:bg-white rounded-xl">
                <td className="px-6 py-4">
                  <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                    <p className="mx-auto text-center text-black">#12345678</p>
                  </div>
                </td>
                <td className="px-6 py-4">Sounds United States Dollar</td>
                <td className="px-6 py-4">270%</td>
                <td className="px-6 py-4">50,000.00 sUSD</td>
                <td className="px-6 py-4">100,000.00 sUSD</td>
                <td className="px-6 py-4">10.0000000000 wBTC</td>
              </tr>
              <tr className="odd:bg-[#F9F9F9] even:bg-white rounded-xl">
                <td className="px-6 py-4">
                  <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                    <p className="mx-auto text-center text-black">#12345678</p>
                  </div>
                </td>
                <td className="px-6 py-4">Sounds United States Dollar</td>
                <td className="px-6 py-4">270%</td>
                <td className="px-6 py-4">50,000.00 sUSD</td>
                <td className="px-6 py-4">100,000.00 sUSD</td>
                <td className="px-6 py-4">10.0000000000 wBTC</td>
              </tr>
              <tr className="odd:bg-[#F9F9F9] even:bg-white rounded-xl">
                <td className="px-6 py-4">
                  <div className="px-3 py-2 bg-[#CBD2DA] rounded-[100px]">
                    <p className="mx-auto text-center text-black">#12345678</p>
                  </div>
                </td>
                <td className="px-6 py-4">Sounds United States Dollar</td>
                <td className="px-6 py-4">270%</td>
                <td className="px-6 py-4">50,000.00 sUSD</td>
                <td className="px-6 py-4">100,000.00 sUSD</td>
                <td className="px-6 py-4">10.0000000000 wBTC</td>
              </tr>
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
      </div>
    </>
  );
}
