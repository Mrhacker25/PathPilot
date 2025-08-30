import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, Bus, Car, TramFront } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function RoutePage() {
  const q = useQuery();
  const navigate = useNavigate();

  const [from, setFrom] = useState(q.get("from") ?? "");
  const [to, setTo] = useState(q.get("to") ?? "");
  const [date, setDate] = useState(q.get("date") ?? "");
  const [time, setTime] = useState(q.get("time") ?? "");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ from, to, date, time }).toString();
    navigate(`/route?${params}`);
  };

  const results = getMockOptions(from, to);

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <aside className="md:col-span-2">
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Plan Your Route</h2>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">From</label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Origin"
                      className="pl-9"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">To</label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Destination"
                      className="pl-9"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Date</label>
                    <div className="relative">
                      <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="date"
                        className="pl-9"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Time</label>
                    <div className="relative">
                      <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="time"
                        className="pl-9"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Update Results
                </Button>
              </form>
            </div>
          </aside>

          <section className="md:col-span-3">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Best Value Options</h2>
                <p className="text-sm text-muted-foreground">
                  Showing low‑cost rides for {from || "your origin"} → {to || "your destination"}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {results.map((r) => (
                <RideOption key={r.id} option={r} onJoin={() => navigate(`/join?ride=${r.id}`)} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

function RideOption({
  option,
  onJoin,
}: {
  option: ReturnType<typeof getMockOptions>[number];
  onJoin: () => void;
}) {
  const Icon = option.type === "Bus" ? Bus : option.type === "Carpool" ? Car : TramFront;
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-foreground">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm text-muted-foreground">{option.type}</p>
          <h3 className="text-base font-semibold">
            {option.name} · {option.duration} · {option.seats} seats
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">from</p>
          <p className="text-lg font-semibold">${option.price.toFixed(2)}</p>
        </div>
        <Button onClick={onJoin}>Join</Button>
      </div>
    </div>
  );
}

function getMockOptions(from: string, to: string) {
  const base = from && to ? 1 : 1.1;
  return [
    {
      id: "bus-1",
      type: "Bus" as const,
      name: "CityLink",
      duration: "35 min",
      seats: 12,
      price: Math.max(1.5, 2.5 * base),
    },
    {
      id: "car-1",
      type: "Carpool" as const,
      name: "Shared Sedan",
      duration: "22 min",
      seats: 2,
      price: Math.max(3, 4.5 * base),
    },
    {
      id: "tram-1",
      type: "Shuttle" as const,
      name: "Community Shuttle",
      duration: "28 min",
      seats: 6,
      price: Math.max(2, 3.2 * base),
    },
  ];
}
