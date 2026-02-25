import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

// Public
import Home from "./pages/all/Home";
import Category from "./pages/all/Category";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
// Admin

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
 <Route path="/category/:id" element={<Category />} />
 <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
      {/* ADMIN */}

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}