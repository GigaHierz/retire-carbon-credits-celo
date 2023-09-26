import { usePrepareContractWrite, useContractWrite, useChainId } from "wagmi";
import { parseEther } from "ethers/lib/utils";

import offsetHelper from "../abis/OffsetHelper3.json";

export default function AutoOffsetExactInToken() {
  const poolAddress = "0xD838290e877E0188a4A44700463419ED96c16107"; // Polygon
  const amount = parseEther("0.001");

  const { config } = usePrepareContractWrite({
    address: offsetHelper.address,
    abi: offsetHelper.abi,
    functionName: "autoOffsetExactInETH",
    args: [
      poolAddress,
      {
        gasLimit: 2500000,
        value: amount,
      },
    ],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const offset = async () => {
    write && write();
  };

  return (
    <div>
      <button onClick={() => offset?.()}>offset</button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}
