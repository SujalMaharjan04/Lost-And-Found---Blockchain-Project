import { PublicKey } from "@solana/web3.js";

export type ItemStatusKey =
  | "open"
  | "claimSubmitted"
  | "readyForPickUp"
  | "completed"
  | "cancelled";

export interface LostItemModel {
  publicKey: PublicKey;
  owner: PublicKey;
  finder: PublicKey;
  itemId: bigint;
  title: string;
  description: string;
  category: string;
  lastSeenLocation: string;
  imageUrl: string;
  rewardLamports: bigint;
  status: ItemStatusKey;
  createdAt: number;
}

export interface RecoveryClaimModel {
  publicKey: PublicKey;
  lostItem: PublicKey;
  finder: PublicKey;
  imageUrl: string;
  foundLocation: string;
  message: string;
  createdAt: number;
}

/**
 * Anchor represents Rust enums as `{ open: {} }`, `{ claimSubmitted: {} }`,
 * etc. This pulls out the single key so the rest of the app can just switch
 * on a plain string.
 */
export function parseItemStatus(raw: unknown): ItemStatusKey {
  const key = Object.keys(raw as object)[0];
  return key as ItemStatusKey;
}
