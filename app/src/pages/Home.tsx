import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Lost something on campus?
          <br />
          <span className="text-brand-500">Put SOL behind finding it.</span>
        </h1>
        <p className="mt-4 text-neutral-400">
          Post a lost item with a SOL reward, held safely in escrow by a Solana
          program until you confirm you actually got it back. No trust
          required, no middleman, no chasing people down for a promised reward.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/create">
            <Button size="lg">Post a Lost Item</Button>
          </Link>
          <Link to="/browse">
            <Button size="lg" variant="outline">
              Browse Lost Items
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <h3 className="mb-2 font-semibold">1. Post & Escrow</h3>
          <p className="text-sm text-neutral-400">
            List the item and set a SOL reward. It's locked in the item's own
            on-chain account the moment you submit — you can't quietly take it
            back once someone starts looking.
          </p>
        </Card>
        <Card>
          <h3 className="mb-2 font-semibold">2. Claim & Review</h3>
          <p className="text-sm text-neutral-400">
            Whoever finds it submits a claim with a photo and location. You
            review it and approve or reject — only you can decide that.
          </p>
        </Card>
        <Card>
          <h3 className="mb-2 font-semibold">3. Confirm & Release</h3>
          <p className="text-sm text-neutral-400">
            Once you physically have your item back, one click releases the
            escrowed reward straight to the finder's wallet.
          </p>
        </Card>
      </div>
    </div>
  );
}
