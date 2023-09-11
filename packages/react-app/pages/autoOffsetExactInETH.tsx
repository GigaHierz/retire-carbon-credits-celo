import { usePrepareContractWrite, useContractWrite, useChainId } from "wagmi";
import { useProvider, useSigner } from "wagmi";

import offsetHelper from "../abis/OffsetHelper.json";
import { FormatTypes, Interface, parseEther } from "ethers/lib/utils";
import { ContractTransaction, ethers } from "ethers";

export default function AutoOffsetExactInToken() {
  const poolAddress = "0x02De4766C272abc10Bc88c220D214A26960a7e92"; // Celo
  const depositedToken = "0x765DE816845861e75A25fCA122bb6898B8B1282a"; // Celo
  const amount = parseEther("0.001");
  const { data: signer } = useSigner();

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

  const chainId = useChainId();

  const offset = async () => {
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
