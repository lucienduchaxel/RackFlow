import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Inventory from "./pages/Inventory";
import Sidebar, { SidebarItem } from "./components/Sidebar.jsx";
import Login from "./pages/Login";
import { Home as HomeIcon, LayoutDashboard } from "lucide-react";
import { UserProvider, useUser } from "./contexts/UserContext.jsx";


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </UserProvider>
  );
}

// Extracted main app content for clarity
function MainApp() {
  const { user, setUser, logout } = useUser();
  const isAuthenticated = !!user;


  const handleLogin = (userInfo) => {
    setUser(userInfo); // Set the user info globally
  };

  return (
    <>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar>
            <Link to="/">
              <SidebarItem
                icon={<HomeIcon size={20} />}
                text="Dashboard"
                link="/"
              />
            </Link>
            <Link to="/inventory">
              <SidebarItem
                icon={<LayoutDashboard size={20} />}
                text="Inventory"
                link="/inventory"
              />
            </Link>
            <Link onClick={logout}>
              <SidebarItem
                icon={<LayoutDashboard size={20} />}
                text="Logout"
                link="/inventory"
              />
            </Link>
          </Sidebar>

          {/* Main Content */}
          <div className="w-full flex flex-col">
            <div className="flex-1 bg-gray-100 dark:bg-slate-800 overflow-auto">
              <Routes>
                <Route path="/inventory" element={<Inventory />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
