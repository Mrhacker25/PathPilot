import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Stepper } from "@/components/common/Stepper";
import { useLocation } from "react-router-dom";

export default function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  const showStepper = ["/", "/route", "/join", "/payment"].some((p) =>
    p === "/" ? location.pathname === "/" : location.pathname.startsWith(p),
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {showStepper && <Stepper />}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
