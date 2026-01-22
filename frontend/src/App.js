import React, { useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import UsersList from "./components/UsersList";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLoginSuccess = (adminStatus) => {
    setIsLoggedIn(true);
    setIsAdmin(adminStatus);
  };

  return (
    <div className="container">
      {/* TITLE */}
      <h2 className="title">
        {!isLoggedIn
          ? showLogin
            ? "Login"
            : "Registration Form"
          : "Dashboard"}
      </h2>

      {/* NOT LOGGED IN */}
      {!isLoggedIn && (
        <>
          {showLogin ? (
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          ) : (
            <RegistrationForm />
          )}

          <p style={{ marginTop: "15px", textAlign: "center", color: "#fff" }}>
            {showLogin ? "New user?" : "Already registered?"}{" "}
            <span
              style={{ color: "#00e6ff", cursor: "pointer", fontWeight: "600" }}
              onClick={() => setShowLogin(!showLogin)}
            >
              {showLogin ? "Register here" : "Login here"}
            </span>
          </p>
        </>
      )}

      {/* LOGGED IN + ADMIN ONLY */}
      {isLoggedIn && isAdmin && (
        <>
          <h3 style={{ color: "#00e6ff", textAlign: "center" }}>
            Admin – Users List
          </h3>
          <UsersList />
        </>
      )}

      {/* LOGGED IN BUT NOT ADMIN */}
      {isLoggedIn && !isAdmin && (
        <p style={{ color: "#fff", textAlign: "center" }}>
          ✅ Login successful</p>
      )}
    </div>
  );
}

export default App;
