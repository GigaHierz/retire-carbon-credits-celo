import { useSigner } from "wagmi";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import OffsetHelper from "../abis/OffsetHelper.json";

export default function AutoOffsetExactInToken() {
  const poolAddress = "0x02De4766C272abc10Bc88c220D214A26960a7e92"; // Celo
  const amount = parseUnits("0.001");
  const { data: signer, isError } = useSigner();

  const offsetHelper = new ethers.Contract(
    OffsetHelper.address,
    OffsetHelper.abi,
    signer
  );

  const offset = async () => {
    const amountOut = await offsetHelper.calculateNeededETHAmount(
      poolAddress,
      amount
    );

    const tx = await offsetHelper.autoOffsetExactOutETH(poolAddress, amount, {
      gasLimit: 5000000,
      value: amountOut,
    });
  };

  return (
    <div>
      <button onClick={offset}>offset</button>
    </div>
  );
}
