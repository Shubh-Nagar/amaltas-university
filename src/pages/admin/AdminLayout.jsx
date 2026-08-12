import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Newspaper, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <p className="admin-sidebar-title">{user?.name || "Admin"}</p>
        <NavLink to="/admin" end className={({ isActive }) => `admin-nav-link${isActive ? " active" : ""}`}>
          <LayoutDashboard size={17} /> Dashboard
        </NavLink>
        <NavLink to="/admin/events" className={({ isActive }) => `admin-nav-link${isActive ? " active" : ""}`}>
          <CalendarDays size={17} /> Events
        </NavLink>
        <NavLink to="/admin/news" className={({ isActive }) => `admin-nav-link${isActive ? " active" : ""}`}>
          <Newspaper size={17} /> News
        </NavLink>
        <button className="admin-logout" onClick={logout}>
          <LogOut size={16} /> Log out
        </button>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
