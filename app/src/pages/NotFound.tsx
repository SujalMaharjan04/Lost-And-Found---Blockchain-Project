import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="mb-2 text-5xl font-bold">404</h1>
      <p className="mb-6 text-neutral-400">
        This page wandered off campus and hasn't been claimed yet.
      </p>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
