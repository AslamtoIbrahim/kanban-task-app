import { useNavigate } from "react-router-dom";
import "./App.css";
import { authService } from "./features/auth/auth.service";
import { Spinner } from "./shared/components/ui/spinner";
import DashboardPage from "./pages/dashboard-page";

function App() {
  const { data, error, isPending } = authService.useSession();
  const navigate = useNavigate();

  
  // const onClickSignOuthandler = async () => {
  //   await authService.signOut().then(({ data, error }) => {
  //     if (error) {
  //       console.log("Error signing out: ", error);
  //     } else {
  //       if (data.success) navigate("/login");
  //       console.log("data out: ", data);
  //     }
  //   });
  // };

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!data?.user) {
    navigate("/login");
    return null;
  }

  return (
    <>
      <DashboardPage />
    </>
  );
}

export default App;
