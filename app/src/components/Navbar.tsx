import { NavLink } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletBalance } from "../hooks/useWalletBalance";
import { cn } from "../lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/browse", label: "Browse Items" },
  { to: "/create", label: "Post Lost Item" },
  { to: "/my-listings", label: "My Listings" },
  { to: "/my-claims", label: "My Claims" },
];

export function Navbar() {
  const { connected } = useWallet();
  const { data: balance } = useWalletBalance();

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <NavLink to="/" className="text-lg font-bold">
          🎒 Campus Lost & Found
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-neutral-400 hover:text-neutral-100",
                  isActive && "bg-neutral-800 text-neutral-100"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {connected && balance !== undefined && (
            <span className="hidden rounded-full bg-neutral-800 px-3 py-1.5 text-xs font-medium sm:inline">
              {balance.toFixed(3)} SOL
            </span>
          )}
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
}
