import React from "react";
import Auth from "./pages/Auth";
import Projects from "./pages/Projects";
import Spinner from "./components/Spinner/Spinner";
import { Route, Routes, Navigate } from "react-router-dom";
import useFindUser from "./hooks/useFindUser";
import { UserContext } from "./context/user.context";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  const { user, setUser, isLoading } = useFindUser();

  if (isLoading)
    return (
      <div className="app__loader">
        <Spinner />
      </div>
    );
  return (
    <div className="app">
      <UserContext.Provider value={{ user, setUser, isLoading }}>
        <Routes>
          <Route
            exact
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route exact path="/" element={<Auth />} />
          <Route exact path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
