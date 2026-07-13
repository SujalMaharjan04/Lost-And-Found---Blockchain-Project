import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import "./App.css";

import Home from "./pages/Home";
import CreateLostItem from "./pages/CreateLostItem";
import BrowseLostItems from "./pages/BrowseLostItems";
import LostItemDetails from "./pages/LostItemDetails";
import MyListings from "./pages/MyListings";
import MyClaims from "./pages/MyClaims";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowseLostItems />} />
          <Route path="/create" element={<CreateLostItem />} />
          <Route path="/items/:pda" element={<LostItemDetails />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/my-claims" element={<MyClaims />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
