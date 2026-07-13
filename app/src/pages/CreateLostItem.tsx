import type { FormEvent} from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";

import { Card } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select } from "../components/ui/select";
import { Button } from "../components/ui/button";

import { useCreateLostItem } from "../hooks/useCreateLostItem";
import { uploadImageToCloudinary } from "../lib/cloudinary";
import { CATEGORIES } from "../lib/constants";

export default function CreateLostItem() {
  const { connected } = useWallet();
  const navigate = useNavigate();
  const createLostItem = useCreateLostItem();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [location, setLocation] = useState("");
  const [rewardSol, setRewardSol] = useState("0.1");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let imageUrl = "";
    if (imageFile) {
      setUploading(true);
      try {
        imageUrl = await uploadImageToCloudinary(imageFile);
      } finally {
        setUploading(false);
      }
    }

    const result = await createLostItem.mutateAsync({
      title,
      description,
      category,
      lastSeenLocation: location,
      imageUrl,
      rewardSol: parseFloat(rewardSol || "0"),
    });

    navigate(`/items/${result.lostItemPda.toBase58()}`);
  };

  if (!connected) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="mb-2 text-2xl font-bold">Connect your wallet</h1>
        <p className="text-neutral-400">
          You'll need a connected Phantom wallet on Devnet to escrow a reward.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Post a Lost Item</h1>

      <Card>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              required
              maxLength={64}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Blue Jansport backpack"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              required
              maxLength={280}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Distinguishing details, contents, etc."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="reward">Reward (SOL)</Label>
              <Input
                id="reward"
                type="number"
                min="0.001"
                step="0.001"
                required
                value={rewardSol}
                onChange={(e) => setRewardSol(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Last Seen Location</Label>
            <Input
              id="location"
              required
              maxLength={100}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Patan Multiple Campus, 2nd floor library"
            />
          </div>

          <div>
            <Label htmlFor="image">Photo (optional)</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={createLostItem.isPending || uploading}
          >
            {uploading
              ? "Uploading photo..."
              : createLostItem.isPending
              ? "Escrowing reward..."
              : "Post Lost Item & Escrow Reward"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
