export const CreateVaultCard = ({
  data,
}: {
  data:
    | {
        tab: string;
        reserveRatio: number;
        minReserveRatio: number;
        riskPenalty: string;
        liquidationRatio: number;
        reserveType: string | number;
        btcPrice: string;
        reserveValue: number;
        liquidationPrice: number;
      }
    | undefined;
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 w-full ">
        <div className="col-start-1 col-span-2 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F2F2F2] p-4 rounded-3xl justify-center h-full">
            <div className="bg-white p-3 rounded-3xl">
              <div className="max-w-full">
                <div className="bg-[#708395] p-5 rounded-3xl flex flex-col justify-center">
                  <p className="text-white">Reserve Ratio</p>
                  <div className="flex mt-2">
                    <p className="text-3xl text-white">
                      {data?.reserveRatio ? data?.reserveRatio : "_"}%{" "}
                    </p>
                  </div>
                </div>
                {data?.minReserveRatio &&
                data?.riskPenalty &&
                data?.liquidationRatio ? (
                  <div className="p-5">
                    <div className="my-2">
                      <p className="text-black text-sm">Min. Reserve Ratio</p>
                      <p className="text-lg text-black font-medium">
                        {data?.minReserveRatio}%{" "}
                      </p>
                    </div>
                    <div className="my-2">
                      <p className="text-black text-sm">Risk penalty</p>
                      <p className="text-lg text-black font-medium">
                        {data?.riskPenalty}% per day{" "}
                      </p>
                    </div>
                    <div className="my-2">
                      <p className="text-black text-sm">Liquidation ratio</p>
                      <p className="text-lg text-black font-medium">
                        {data?.liquidationRatio}%{" "}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-80 px-5 text-center">
                    Input your amount to simulate the reserve ratio.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-3 rounded-3xl">
              <div className="max-w-full">
                <div className="bg-[#FB5108] p-5 rounded-3xl">
                  <p className="text-white">Liquidation price</p>
                  <div className="mt-2">
                    <p className="text-3xl text-white">
                      {data?.liquidationPrice
                        ? data?.liquidationPrice.toFixed(4)
                        : "-"}{" "}
                      sUSD
                    </p>
                  </div>
                </div>
                {data?.btcPrice && data?.reserveValue ? (
                  <div className="p-5">
                    <div className="my-2">
                      <p className="text-black text-sm">BTC price</p>
                      <p className="text-lg text-black font-medium">
                        {(Number(data?.btcPrice) / 10 ** 18).toFixed(4)} sUSD
                      </p>
                    </div>
                    <div className="my-2">
                      <p className="text-black text-sm">Reserve value</p>
                      <p className="text-lg text-black font-medium">
                        {(Number(data?.reserveValue) / 10 ** 18).toFixed(4)}{" "}
                        sUSD
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-80 px-5 text-center">
                    Input your amount to simulate the liquidation price.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
