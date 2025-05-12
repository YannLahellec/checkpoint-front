import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-pink-500 text-white py-2 flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold mb-1">Checkpoint : frontend</h1>
      <Link to="/" className="text-white hover:underline">
        Countries
      </Link>
    </header>
  );
}
