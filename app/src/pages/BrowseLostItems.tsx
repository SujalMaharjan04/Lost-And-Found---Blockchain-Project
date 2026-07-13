import { useMemo, useState } from "react";
import { useLostItems } from "../hooks/useLostItems";
import { ItemCard } from "../components/ItemCard";
import { LoadingGrid } from "../components/LoadingGrid";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { CATEGORIES } from "../lib/constants";

export default function BrowseLostItems() {
  const { data: items, isLoading, isError } = useLostItems();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    if (!items) return [];
    return items
      .filter((item) => item.status === "open")
      .filter((item) => category === "all" || item.category === category)
      .filter((item) =>
        search.trim().length === 0
          ? true
          : `${item.title} ${item.description}`.toLowerCase().includes(search.toLowerCase())
      );
  }, [items, search, category]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Browse Lost Items</h1>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
        <Select value={category} onChange={(e) => setCategory(e.target.value)} className="sm:max-w-xs">
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      {isLoading && <LoadingGrid />}
      {isError && <p className="text-red-400">Failed to load items from the program.</p>}

      {!isLoading && !isError && filtered.length === 0 && (
        <p className="text-neutral-500">No open items match your filters yet.</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <ItemCard key={item.publicKey.toBase58()} item={item} />
        ))}
      </div>
    </div>
  );
}
