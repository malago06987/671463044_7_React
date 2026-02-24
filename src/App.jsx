import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

// Public
import Home from "./pages/all/Home";
import PostDetail from "./pages/all/postDetail";

// Admin
import Dashboard from "./pages/admin/dashboard";
import Posts from "./pages/admin/posts";
import CategoriesAdmin from "./pages/admin/categories";
import Users from "./pages/admin/users";

function NotFound() {
  return (
    <div className="container py-5">
      <h2>404</h2>
      <p className="text-muted">หาไม่เจอ</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<PostDetail />} />

      {/* ADMIN */}
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/posts" element={<Posts />} />
      <Route path="/admin/categories" element={<CategoriesAdmin />} />
      <Route path="/admin/users" element={<Users />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}