import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="mb-2 text-5xl font-extrabold">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">We couldn't find that page.</p>
        <Link to="/" className="text-primary underline-offset-4 hover:underline">
          Return to Home
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
