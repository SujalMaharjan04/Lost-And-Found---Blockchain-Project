import { clusterApiUrl, PublicKey } from "@solana/web3.js";

// Devnet by design for this hackathon build — swap the endpoint (and
// PROGRAM_ID after a mainnet deploy) if you ever move clusters.
export const CLUSTER = "devnet" as const;
export const RPC_ENDPOINT = clusterApiUrl(CLUSTER);

// Replace with the value printed by `anchor keys list` (must match
// `declare_id!` in lib.rs and `Anchor.toml`).
export const PROGRAM_ID = new PublicKey("3wH477PFXiqmei2cvxZiTrLescHPZ5xp5AUuPhP6eFJc");

// Set these in app/.env (see .env.example) — Cloudinary's unsigned upload
// preset lets the browser upload directly without exposing an API secret.
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
export const CLOUDINARY_UPLOAD_PRESET = import.meta.env
  .VITE_CLOUDINARY_UPLOAD_PRESET as string;

export const CATEGORIES = [
  "Electronics",
  "Bags",
  "Books & Stationery",
  "ID Cards & Documents",
  "Keys",
  "Clothing",
  "Other",
] as const;
