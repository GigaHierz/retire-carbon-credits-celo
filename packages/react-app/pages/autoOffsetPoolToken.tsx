import { usePrepareContractWrite, useContractWrite, useChainId } from "wagmi";
import ToucanClient from "toucan-sdk";
import { useProvider, useSigner } from "wagmi";

import offsetHelper from "../abis/OffsetHelper.json";
import { parseEther } from "ethers/lib/utils";
import { ContractTransaction, ethers } from "ethers";

export default function AutoOffsetPoolToken() {
  const poolAddress = "0x02De4766C272abc10Bc88c220D214A26960a7e92";
  const amount = parseEther("0.001");
  const provider = useProvider();
  const { data: signer, isError } = useSigner();
  const toucan = new ToucanClient("celo", provider);
  signer && toucan.setSigner(signer);
  const poolToken = toucan.getPoolContract("NCT");

  const approve = async () => {
    return await poolToken.approve(offsetHelper.address, amount);
  };

  const { config } = usePrepareContractWrite({
    address: offsetHelper.address,
    abi: offsetHelper.abi,
    functionName: "autoOffsetPoolToken",
    args: [
      poolAddress,
      amount,
      {
        gasLimit: 2500000,
      },
    ],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  const chainId = useChainId();

  const offset = async () => {
    console.log("offset");
    const tx = await approve();
    await tx.wait();

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
