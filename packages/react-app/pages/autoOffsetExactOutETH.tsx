import { useSigner } from "wagmi";
import { parseUnits } from "ethers/lib/utils";
import { ethers } from "ethers";
import offsetHelper from "../abis/OffsetHelper2.json";
import { useRef } from "react";

export default function AutoOffsetExactOutETH() {
  const poolAddress = "0xD838290e877E0188a4A44700463419ED96c16107"; // Polygon
  const amount = parseUnits("0.001");
  const { data: signer, isError } = useSigner();
  const transaction = useRef(null);

  const contract = new ethers.Contract(
    offsetHelper.address,
    offsetHelper.abi,
    signer
  );

  const offset = async () => {
    const amountOut = await contract.calculateNeededETHAmount(
      poolAddress,
      amount
    );

    const tx = await contract.autoOffsetExactOutETH(poolAddress, amount, {
      gasLimit: 5000000,
      value: amountOut,
    });
    transaction.current = tx;
  };

  return (
    <div>
      <button onClick={offset}>offset</button>
    </div>
  );
}
