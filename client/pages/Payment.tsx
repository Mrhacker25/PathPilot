import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const ride = params.get("ride") ?? "your selection";

  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold">Payment</h1>
          <p className="mt-2 text-muted-foreground">
            Secure checkout for {ride}. This placeholder page can be expanded with a payment form.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
            <Button size="lg">Pay Now</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
