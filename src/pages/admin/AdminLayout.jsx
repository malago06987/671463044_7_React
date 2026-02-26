import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="container py-4">
      <h3>เเอดมิน</h3>

      <div className="mb-3 d-flex gap-2">
        <NavLink className="btn btn-outline-primary" to="/admin" end>
          Dashboard
        </NavLink>
        <NavLink className="btn btn-outline-secondary" to="/admin/categories">
          Categories
        </NavLink>
        <NavLink className="btn btn-outline-success" to="/admin/posts">
          Posts
        </NavLink>
        <NavLink className="btn btn-outline-dark" to="/admin/users">
          Users
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}