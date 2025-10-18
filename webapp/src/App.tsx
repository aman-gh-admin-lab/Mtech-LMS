import "./App.css";
import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { LocationGenerics, routes } from "./routes";
import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useUser, SignInButton, UserButton } from "@clerk/clerk-react"; // Import useUser

const location = new ReactLocation<LocationGenerics>();

function App() {
  const { isSignedIn } = useUser();

  return (
    <>
      {/* Auth header */}
      <header style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
        {!isSignedIn ? (
          <SignInButton />
        ) : (
          <UserButton />
        )}
      </header>

      {/* Your existing router and layout */}
      <Router location={location} routes={routes}>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </Router>

      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
