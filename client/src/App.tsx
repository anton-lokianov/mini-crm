import { useEffect } from "react";
import Header from "./components/header/header";
import { Toaster } from "./components/ui/sonner";
import MainRoutes from "./routes/mainRoutes";
import { useAuthStore } from "./service/store/auth-store";

const App = () => {
  const checkToken = useAuthStore((state) => state.checkToken);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <>
      <Header />
      <MainRoutes />
      <Toaster richColors />
    </>
  );
};

export default App;
