import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return "";
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function lamportsToSol(lamports: number | bigint): number {
  return Number(lamports) / LAMPORTS_PER_SOL;
}

export function solToLamports(sol: number): number {
  return Math.round(sol * LAMPORTS_PER_SOL);
}

export function formatSol(lamports: number | bigint): string {
  return `${lamportsToSol(lamports).toFixed(3)} SOL`;
}

export function formatDate(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function explorerUrl(signatureOrAddress: string, kind: "tx" | "address" = "tx"): string {
  return `https://explorer.solana.com/${kind}/${signatureOrAddress}?cluster=devnet`;
}
