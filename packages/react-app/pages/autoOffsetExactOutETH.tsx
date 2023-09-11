import {
  usePrepareContractWrite,
  useContractRead,
  useContractWrite,
  useSigner,
} from "wagmi";

import offsetHelper from "../abis/OffsetHelper.json";
import { parseEther } from "ethers/lib/utils";

export default function AutoOffsetExactOutETH() {
  const poolAddress = "0x02De4766C272abc10Bc88c220D214A26960a7e92"; // Celo
  const depositedToken = "0x765DE816845861e75A25fCA122bb6898B8B1282a"; // Celo
  const amount = parseEther("0.001");
  const { data: signer, isError } = useSigner();

  // calculate the needed amount of ERC20 tokens to offset
  const calculateNeededAmount: any = useContractRead({
    address: offsetHelper.address,
    abi: offsetHelper.abi,
    functionName: "calculateNeededETHAmount",
    args: [poolAddress, amount],
  });

  const { config } = usePrepareContractWrite({
    address: offsetHelper.address,
    abi: offsetHelper.abi,
    functionName: "autoOffsetExactOutETH",
    args: [
      poolAddress,
      amount,
      {
        gasLimit: 2500000,
        value: calculateNeededAmount,
      },
    ],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const offset = async () => {
    write && write();

    console.log(isLoading);
    console.log(isSuccess);
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
