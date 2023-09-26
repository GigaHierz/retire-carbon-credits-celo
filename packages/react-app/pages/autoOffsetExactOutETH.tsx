import { useSigner } from "wagmi";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import offsetHelper from "../abis/OffsetHelper3.json";

export default function AutoOffsetExactOutETH() {
  const poolAddress = "0xD838290e877E0188a4A44700463419ED96c16107"; // Polygon

  const amount = parseEther("0.001");
  const { data: signer, isError } = useSigner();

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

    await contract.autoOffsetExactOutETH(poolAddress, amount, {
      gasLimit: 5000000,
      value: amountOut,
    });
    console.log(amountOut);
  };

  return (
    <div>
      <button onClick={() => offset?.()}>offset</button>
    </div>
  );
}
