import { parseEther } from "ethers/lib/utils.js";
import { useState } from "react";
import ToucanClient from "toucan-sdk";
import { useProvider, useSigner } from "wagmi";

export default function Home() {
  const provider = useProvider();
  const { data: signer, isError, isLoading } = useSigner();
  const toucan = new ToucanClient("alfajores", provider);
  signer && toucan.setSigner(signer);
  const [tco2address, setTco2address] = useState("");

  const redeemPoolToken = async (): Promise<void> => {
    const redeemedTokenAddress = await toucan.redeemAuto2(
      "NCT",
      parseEther("1")
    );
    console.log(redeemedTokenAddress);
    redeemedTokenAddress && setTco2address(redeemedTokenAddress[0].address);
  };

  const retirePoolToken = async (): Promise<void> => {
    tco2address.length && (await toucan.retire(parseEther("1.0"), tco2address));
  };

  return (
    <div>
      <button
        className="inline-flex w-full justify-center rounded-full border px-5 my-5 py-2 text-md font-medium border-wood bg-prosperity text-black hover:bg-snow"
        onClick={() => redeemPoolToken()}
      >
        {"Redeem Tokens"}
      </button>
      <button
        className="inline-flex w-full justify-center rounded-full border px-5 my-5 py-2 text-md font-medium border-wood bg-prosperity text-black hover:bg-snow"
        onClick={() => retirePoolToken()}
      >
        {"Retire Tokens"}
      </button>
    </div>
  );
}
