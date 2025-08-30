import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">R</span>
          <span className="font-extrabold tracking-tight text-[18px]">RideLite</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            to="/"
            className={cn(
              "text-muted-foreground transition-colors hover:text-foreground",
              isHome && "text-foreground",
            )}
          >
            Home
          </Link>
          <Link
            to="/route"
            className={cn(
              "text-muted-foreground transition-colors hover:text-foreground",
              location.pathname.startsWith("/route") && "text-foreground",
            )}
          >
            Route
          </Link>
          <Link
            to="/join"
            className={cn(
              "text-muted-foreground transition-colors hover:text-foreground",
              location.pathname.startsWith("/join") && "text-foreground",
            )}
          >
            Join Ride
          </Link>
          <Link
            to="/payment"
            className={cn(
              "text-muted-foreground transition-colors hover:text-foreground",
              location.pathname.startsWith("/payment") && "text-foreground",
            )}
          >
            Payment
          </Link>
        </nav>
      </div>
    </header>
  );
}
