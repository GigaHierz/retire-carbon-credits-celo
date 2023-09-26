import {
  usePrepareContractWrite,
  useContractRead,
  useContractWrite,
  useSigner,
} from "wagmi";

import offsetHelper from "../abis/OffsetHelper3.json";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "ethers";

export default function AutoOffsetExactOutETH() {
  const poolAddress = "0xD838290e877E0188a4A44700463419ED96c16107"; // Polygon

  const amount = parseEther("0.001");
  const { data: signer, isError } = useSigner();

  const contract = new ethers.Contract(
    offsetHelper.address,
    offsetHelper.abi,
    signer
  );

  const calculateAmount = async () => {
    const amountOut = await contract.calculateNeededETHAmount(
      poolAddress,
      amount
    );

    await contract.autoOffsetExactOutETH(poolAddress, amount, {
      gasLimit: 5000000,
      value: amountOut,
    });
    console.log(amountOut);
  };

  const offset = async () => {
    calculateAmount();
    console.log("offset");
    // console.log(calculateNeededAmount);
    // console.log(calculateNeededAmount.data);

    // write && write();

    // console.log(isLoading);
    // console.log(isSuccess);
    // console.log(data);
  };

  return (
    <div>
      <button onClick={() => offset?.()}>offset</button>
    </div>
  );
}
