import { useSigner } from "wagmi";
import { parseEther } from "ethers/lib/utils";
import { useRef } from "react";
import { ethers } from "ethers";
import offsetHelper from "../abis/OffsetHelper2.json";

export default function AutoOffsetExactInToken() {
  const poolAddress = "0xD838290e877E0188a4A44700463419ED96c16107"; // Polygon
  const amount = parseEther("0.001");
  const { data: signer, isError } = useSigner();
  const transaction = useRef(null);

  const contract = new ethers.Contract(
    offsetHelper.address,
    offsetHelper.abi,
    signer
  );

  const offset = async () => {
    const tx = await contract.autoOffsetExactInETH(poolAddress, {
      gasLimit: 5000000,
      value: amount,
    });
    transaction.current = tx;
    console.log(tx);
  };

  return (
    <div>
      <button onClick={offset}>offset</button>
    </div>
  );
}
