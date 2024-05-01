import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full flex justify-center items-center">
      <Card>
        <CardHeader>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Page Not Found (404)
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The page you are looking for does not exist.
          </p>
          <Button className="mt-6 text-foreground" onClick={() => navigate(-1)}>
            go back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page404;
