import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function JoinRide() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const ride = params.get("ride") ?? "your selection";

  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold">Join Ride</h1>
          <p className="mt-2 text-muted-foreground">
            You are joining {ride}. This step will collect passenger details.
          </p>
          <div className="mt-6 flex justify-center">
            <Button size="lg" onClick={() => navigate(`/payment?ride=${ride}`)}>
              Continue to Payment
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
