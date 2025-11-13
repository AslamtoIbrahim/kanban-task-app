import { useNavigate } from "react-router-dom";
import "./App.css";
import { authService } from "./features/auth/auth.service";
import { Spinner } from "./shared/components/ui/spinner";

function App() {
  const { data, error, isPending } = authService.useSession();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("data: ", data);
  //   if (data?.user) {
  //     console.log("user: ", data.user);
  //     navigate("/login");
  //   }
  // }, [data, navigate]);
  const onClickhandler = async () => {
    await authService.signOut().then(({ data, error }) => {
      if (error) {
        console.log("Error signing out: ", error);
      } else {
        if (data.success) navigate("/login");
        console.log("data out: ", data);
      }
    });
  };

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
      <div>
        <h1>Welcome to the App</h1>
        <p>{data?.user ? `Hello, ${data.user.name}` : "Please log in."}</p>
        <button
          className="bg-lime-600 px-2 cursor-pointer"
          onClick={onClickhandler}
        >
          Sign out
        </button>
      </div>
    </>
  );
}

export default App;
