import "./App.css";
import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { LocationGenerics, routes } from "./routes";
import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useUser, RedirectToSignIn, UserButton } from "@clerk/clerk-react"; // Note: add UserButton import

const location = new ReactLocation<LocationGenerics>();

function App() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    // Optionally show a loading indicator here
    return null;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <>
      {/* Auth Header */}
      <header style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
        <UserButton />
      </header>
      {/* Main routing and layout */}
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
