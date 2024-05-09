import { useEffect } from "react";
import Header from "./components/header/header";
import { Toaster } from "./components/ui/sonner";
import MainRoutes from "./routes/mainRoutes";
import { useAuthStore } from "./service/store/auth-store";
import ErrorBoundary from "./components/global/errorBoundary";
import CustomModal from "./components/global/customModal";

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
      <CustomModal />
    </>
  );
};

export default App;
