import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  omniWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { polygon, polygonMumbai } from "wagmi/chains";

// Import known recommended wallets
import { Valora, CeloWallet, CeloDance } from "@celo/rainbowkit-celo/wallets";

// Import CELO chain information
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";

import Layout from "../components/Layout";
import { log } from "console";

const { chains, provider } = configureChains(
  [Alfajores, Celo, polygonMumbai, polygon],
  [
    jsonRpcProvider({
      rpc: (chain) =>
        chain.id === 80001 || chain.id === 137
          ? { http: "https://rpc.ankr.com/polygon" }
          : { http: "https://forno.celo.org" },
    }),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended with CELO",
    wallets: [
      Valora({ chains }),
      CeloWallet({ chains }),
      CeloDance({ chains }),
      metaMaskWallet({ chains }),
      omniWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} coolMode={true}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
