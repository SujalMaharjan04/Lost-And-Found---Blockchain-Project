import { PublicKey } from "@solana/web3.js";
import type { LostItemModel, RecoveryClaimModel } from "../types/models";
import { parseItemStatus } from "../types/models";

// The shape Anchor's `program.account.lostItem.all()` / `.fetch()` returns.
// Loosely typed here on purpose — the generated IDL type is the source of
// truth, this is just a defensive mapping layer.
export function mapLostItem(publicKey: PublicKey, account: any): LostItemModel {
  return {
    publicKey,
    owner: account.owner,
    finder: account.finder,
    itemId: BigInt(account.itemId.toString()),
    title: account.title,
    description: account.description,
    category: account.category,
    lastSeenLocation: account.lastSeenLocation,
    imageUrl: account.imageUrl,
    rewardLamports: BigInt(account.rewardLamports.toString()),
    status: parseItemStatus(account.status),
    createdAt: Number(account.createdAt.toString()),
  };
}

export function mapRecoveryClaim(publicKey: PublicKey, account: any): RecoveryClaimModel {
  return {
    publicKey,
    lostItem: account.lostItem,
    finder: account.finder,
    imageUrl: account.imageUrl,
    foundLocation: account.foundLocation,
    message: account.message,
    createdAt: Number(account.createdAt.toString()),
  };
}
