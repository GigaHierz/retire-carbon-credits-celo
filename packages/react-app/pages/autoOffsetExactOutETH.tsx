import {
  usePrepareContractWrite,
  useContractRead,
  useContractWrite,
  useSigner,
} from "wagmi";
import {
  FormatTypes,
  Interface,
  parseEther,
  parseUnits,
} from "ethers/lib/utils";
import { ethers } from "ethers";
import offsetHelper from "../abis/OffsetHelper2.json";

export default function AutoOffsetExactOutETH() {
  const poolAddress = "0xD838290e877E0188a4A44700463419ED96c16107"; // Polygon
  // const depositedToken = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"; // Polygon - WMATIC
  const depositedToken = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"; // Polygon - WETH - route is wrong

  const amount = parseUnits("0.001");
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

  return (
    <div>
      <button onClick={() => calculateAmount?.()}>offset</button>
    </div>
  );
}
