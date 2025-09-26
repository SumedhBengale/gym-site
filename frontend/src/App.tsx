import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Button } from "./components/ui/button";
import { Login } from "./pages/Login";
import { useSession, signOut } from "@/lib/auth-client";
import "./index.css";

const App = () => {
  const { data: session, isPending } = useSession();

  // Show loading state while checking session
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("Successfully signed out");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!session ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/"
          element={
            session ? (
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h1 className="text-3xl font-bold">Welcome to Gym Site</h1>
                  <p className="text-gray-600">
                    Hello, {session.user.name || session.user.email}!
                  </p>
                  <div className="space-x-4">
                    <Button onClick={handleSignOut} variant="outline">
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h1 className="text-3xl font-bold">Welcome to Gym Site</h1>
                  <p className="text-gray-600">Please sign in to continue</p>
                  <Button onClick={() => (window.location.href = "/login")}>
                    Go to Login
                  </Button>
                </div>
              </div>
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
