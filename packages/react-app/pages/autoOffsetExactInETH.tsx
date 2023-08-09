import { usePrepareContractWrite, useContractWrite, useChainId } from "wagmi";
import { useProvider, useSigner } from "wagmi";

import offsetHelper from "../abis/OffsetHelper3.json";
import { FormatTypes, Interface, parseEther } from "ethers/lib/utils";
import { ContractTransaction, ethers } from "ethers";

export default function AutoOffsetExactInToken() {
  const poolAddress = "0xD838290e877E0188a4A44700463419ED96c16107"; // Polygon
  const depositedToken = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"; // Polygon
  const amount = parseEther("0.001");
  const provider = useProvider();
  const { data: signer, isError } = useSigner();

  const { config } = usePrepareContractWrite({
    address: offsetHelper.address,
    abi: offsetHelper.abi,
    functionName: "autoOffsetExactInETH",
    args: [
      // depositedToken,
      poolAddress,
      {
        gasLimit: 2500000,
        value: amount,
      },
    ],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const chainId = useChainId();

  const offset = async () => {
    // const tx = await approve();
    // await tx.wait();

    write && write();
    console.log(chainId);

    console.log(isLoading);
    console.log(isSuccess);
    // console.log(write && write());
    console.log(data);
  };

  return (
    <div>
      <button onClick={() => offset?.()}>offset</button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}
