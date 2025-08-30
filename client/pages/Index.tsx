import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useState } from "react";

export default function Index() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const onQuickPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ from, to, date, time }).toString();
    navigate(`/route?${params}`);
  };

  return (
    <Layout>
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-12 sm:py-16 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Low‑Cost Transport, Seamless Steps
            </h1>
            <p className="text-muted-foreground text-lg">
              Plan a route, join a ride, and pay in a few clean, simple steps. Minimal and fast—because getting there shouldn’t be expensive.
            </p>
            <ul className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <li className="rounded-full bg-secondary px-3 py-1">Affordable</li>
              <li className="rounded-full bg-secondary px-3 py-1">Reliable</li>
              <li className="rounded-full bg-secondary px-3 py-1">Eco‑friendly</li>
            </ul>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Quick Plan</h2>
            <form onSubmit={onQuickPlan} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              <Button className="w-full" size="lg" type="submit">
                Find Low‑Cost Options
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <Feature title="Transparent Prices" desc="See the best value across buses, carpools, and shared rides." />
          <Feature title="Trusted Drivers" desc="Community‑rated carpool hosts for safe, friendly trips." />
          <Feature title="Fast Booking" desc="Reserve in seconds with a clean, minimal interface." />
        </div>
      </section>
    </Layout>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
