import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID } from "./constants";
import { BN } from "bn.js";

export function deriveLostItemPda(owner: PublicKey, itemId: bigint): [PublicKey, number] {
  const itemIdBuf = new BN(itemId.toString()).toArrayLike(Buffer, "le", 8)
  itemIdBuf.writeBigUInt64LE(itemId);
  return PublicKey.findProgramAddressSync(
    [Buffer.from("lost_item"), owner.toBuffer(), itemIdBuf],
    PROGRAM_ID
  );
}

export function deriveClaimPda(lostItem: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([Buffer.from("claim"), lostItem.toBuffer()], PROGRAM_ID);
}
