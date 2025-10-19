import { useUser, RedirectToSignIn } from "@clerk/clerk-react";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return null;
  if (!isSignedIn) return <RedirectToSignIn />;
  if (user?.publicMetadata?.role !== "admin") {
    return <div>Access denied. Admins only.</div>;
  }

  return <>{children}</>;
}