import "./App.css";
import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { LocationGenerics, routes } from "./routes";
import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"; // Add these lines

const location = new ReactLocation<LocationGenerics>();

function App() {
  return (
    <>
      {/* Clerk Auth Header */}
      <header style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

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
