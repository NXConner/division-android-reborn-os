import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card variant="tactical" className="max-w-md w-full">
        <CardHeader className="pb-3">
          <CardTitle>PAGE NOT FOUND</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm text-muted-foreground font-mono">
            The requested route could not be located.
          </div>
          <div className="text-xs text-muted-foreground font-mono break-words">
            Path: {location.pathname}
          </div>
          <Button asChild variant="tactical" className="mt-2">
            <Link to="/">Return to Tactical Overview</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
