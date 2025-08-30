import { Link, useLocation } from "react-router-dom";

const steps = [
  { label: "Home", path: "/" },
  { label: "Route", path: "/route" },
  { label: "Join Ride", path: "/join" },
  { label: "Payment", path: "/payment" },
];

export function Stepper() {
  const location = useLocation();
  const activeIndex = steps.findIndex((s) =>
    s.path === "/" ? location.pathname === "/" : location.pathname.startsWith(s.path),
  );

  const progress = ((activeIndex + 1) / steps.length) * 100;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-6">
      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-muted" />
        <div
          className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
        <ol className="relative z-10 flex items-center justify-between">
          {steps.map((s, i) => {
            const isActive = i <= activeIndex;
            return (
              <li key={s.path} className="flex flex-col items-center gap-2">
                <Link
                  to={s.path}
                  className={
                    "flex h-8 w-8 items-center justify-center rounded-full border bg-background text-xs font-semibold transition-colors " +
                    (isActive ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground")
                  }
                >
                  {i + 1}
                </Link>
                <span className="text-[11px] text-muted-foreground">{s.label}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
