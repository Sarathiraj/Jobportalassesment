import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./Pages/Auth";
import Joblist from "./Pages/Joblist";
import Applicationform from "./Pages/Applicationform";
import AdminPanel from "./Pages/Admindashboard";
import Login from "./Pages/Logindetails";
import Signup from "./Pages/Signupdetails";
import Header from "./Components/Header";

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/signup" />;
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoutes>
                  <AdminPanel />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Joblist />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/Jobapplication"
              element={
                <ProtectedRoutes>
                  <Applicationform />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoutes>
                  <AdminPanel />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
