import { ORACLE_CONFIG } from "@/app/helpers";
import getDetailedVaultData from "@/hooks/getDetailedVaultData";
import getReserveParams from "@/hooks/getReserveParams";
import getTabParams from "@/hooks/getTabParams";
import getTokenName from "@/hooks/getTokenName";
import { useAccount, useReadContract } from "wagmi";

type Vault = {
  reserveAddr: string;
  reserveAmt: bigint;
  tab: string;
  tabAmt: bigint;
  osTabAmt: bigint;
  pendingOsMint: bigint;
};

export const VaultSubPagesCard = ({ id }: { id: number }) => {
  const { address } = useAccount();

  const data: Vault | null = getDetailedVaultData(address, id);
  console.log(data);
  const reserveData = getReserveParams(
    "0x6588b8894fca8cf664a5104c02483d947c24df3a4f2069053c798bcba9b23870"
  );

  const removeSPrefix = (symbol: string) => {
    return symbol.slice(1);
  };

  function stringToBytes3(inputString: string): string {
    if (inputString.length !== 3) {
      throw new Error("Input string must be exactly 3 characters long.");
    }

    const charCodes = inputString.split("").map((char) => char.charCodeAt(0));

    const hexString = charCodes
      .map((code) => code.toString(16).padStart(2, "0"))
      .join("");

    if (hexString.length !== 6) {
      throw new Error("Error converting string to bytes3.");
    }

    return `0x${hexString}`;
  }
  const tokenName = getTokenName(data ? data.tab : 0);
  const symbol = removeSPrefix(tokenName || "sUSD");
  const tabKey = stringToBytes3(symbol);
  const tabData = getTabParams(tabKey);

  const { data: oraclePrice }: { data: any } = useReadContract({
    ...ORACLE_CONFIG,
    functionName: "getOldPrice",
    args: [tabKey],
  });
  const btcPrice = Number(oraclePrice) / 10 ** 18;

  function calcLiqPrice() {
    const reserveValue = (Number(data?.tabAmt) * 120) / 100;
    const liQuidationPrice = reserveValue / Number(data?.reserveAmt);
    return liQuidationPrice;
  }

  if (!data) return <></>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F2F2F2] p-4 rounded-3xl justify-center">
      <div className="bg-white p-3 rounded-3xl">
        <div className="max-w-sm">
          <div className="bg-[#708395] p-5 rounded-3xl">
            <p className="text-white text-sm">Reserve Ratio</p>
            <div className="flex mt-2">
              <p className="text-2xl text-white">257.38% </p>
              <span className="my-auto ml-3">
                <VerifiedCheckIcon />
              </span>
            </div>
            <p className="text-normal text-white mt-2 text-sm">
              currently 190.05%{" "}
            </p>
          </div>
          <div className="p-5">
            <div className="my-4">
              <p className="text-black text-sm">Min. Reserve Ratio</p>
              <p className="text-lg text-black font-medium">
                {reserveData && (reserveData?.minReserveRatio).toString()}%{" "}
              </p>
            </div>
            <div className="my-4">
              <p className="text-black text-sm">Risk penalty</p>
              <p className="text-lg text-black font-medium">
                {tabData &&
                  (Number(tabData.riskPenaltyPerFrame) / 100).toString()}
                % per day{" "}
              </p>
            </div>
            <div className="my-4">
              <p className="text-black text-sm">Liquidation ratio</p>
              <p className="text-lg text-black font-medium">
                {reserveData && reserveData.liquidationRatio.toString()}%{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-3 rounded-3xl">
        <div className="max-w-sm">
          <div className="bg-[#FB5108] p-5 rounded-3xl">
            <p className="text-white text-sm">Liquidation price</p>
            <div className="mt-2">
              <p className="text-2xl text-white">
                {calcLiqPrice()} {tokenName}
              </p>
            </div>
            <p className="text-normal text-sm text-white mt-2">
              currently: 11,500.0000 sUSD{" "}
            </p>
          </div>
          <div className="p-5">
            <div className="my-4">
              <p className="text-black text-sm">BTC price</p>
              <p className="text-lg text-black font-medium">
                {btcPrice.toFixed(4)} {tokenName}
              </p>
            </div>
            <div className="my-4">
              <p className="text-black text-sm">Tab</p>
              <p className="text-lg text-black font-medium">
                {Number(data.tabAmt) / 10 ** 18} {tokenName}
              </p>
              <p className="text-black text-sm">Currently: 30,000.1234 sUSD</p>
            </div>
            <div className="my-4">
              <p className="text-black text-sm">Reserve</p>
              <p className="text-lg text-black font-medium">
                {Number(data.reserveAmt) / 10 ** 18} cBTC
              </p>
              <p className="text-black text-sm">Currently: 1 cBTC</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-3 rounded-3xl">
        <div className="max-w-sm">
          <div className="bg-[#695D5A] p-5 rounded-3xl">
            <p className="text-white text-sm">Outstanding tabs</p>
            <div className="mt-2">
              <p className="text-2xl text-white">
                {" "}
                {Number(data.osTabAmt)} {tokenName}
              </p>
            </div>
            <p className="text-white mt-2 text-sm">
              Currently: 11,500.0000 sUSD
            </p>
          </div>
          <p className="text-white">Currently: 11,500.0000 sUSD</p>
          <div className="p-5">
            <div className="my-4">
              <p className="text-black text-sm">Minted tabs</p>
              <p className="text-lg text-black font-medium">
                {" "}
                {Number(data?.tabAmt) / 10 ** 18} {tokenName}
              </p>
              <p className="text-black text-sm">Currently: 10,000.1234 sUSD</p>
            </div>
            <div className="my-4">
              <p className="text-black text-sm">Risk penalty</p>
              <p className="text-lg text-black font-medium">0 sUSD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
