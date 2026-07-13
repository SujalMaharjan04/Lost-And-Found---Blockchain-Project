import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Buffer } from "buffer";

import "@solana/wallet-adapter-react-ui/styles.css";
import "./index.css";

import { SolanaProvider } from "./providers/SolanaProvider";
import App from "./App";


window.Buffer = window.Buffer || Buffer
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 10_000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <SolanaProvider>
          <App />
          <Toaster theme="dark" position="bottom-right" richColors />
        </SolanaProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
