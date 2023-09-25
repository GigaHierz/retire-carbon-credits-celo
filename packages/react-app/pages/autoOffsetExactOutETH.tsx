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

  // calculate the needed amount of ERC20 tokens to offset
  const calculateNeededAmount: any = useContractRead({
    address: offsetHelper.address,
    abi: offsetHelper.abi,
    functionName: "calculateNeededETHAmount",
    args: [depositedToken, poolAddress, amount],
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
        value: calculateNeededAmount.data,
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
