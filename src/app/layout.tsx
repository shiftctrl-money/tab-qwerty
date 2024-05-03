"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { arbitrumSepolia, mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Footer } from "@/components/Footer";
import "sweetalert2/src/sweetalert2.scss";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const config = getDefaultConfig({
  appName: "shiftCtrl",
  projectId: "YOUR_PROJECT_ID",
  chains: [arbitrumSepolia],
  ssr: true,
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <Toaster />
              <Header />
              {children}
              <Footer />
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}