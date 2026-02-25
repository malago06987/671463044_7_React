import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/include/Navbar";

// Public
import Home from "./pages/all/Home";
import Category from "./pages/all/Category";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";

function NotFound() {
  return (
    <div className="container py-5">
      <h2>404</h2>
      <p className="text-muted">หาไม่เจอ</p>
    </div>
  );
}

const API = "http://localhost/671463044_7_REACT_API/api";

export default function App() {
  const [user, setUser] = useState(null);
const [categories, setCategories] = useState([]);

  // โหลด session user
  const loadUser = () =>
    axios
      .get(`${API}/auth/activeUser.php`, { withCredentials: true })
      .then((res) => {
        if (res.data.status === "success") setUser(res.data.user);
        else setUser(null);
      })
      .catch(() => setUser(null));
const loadCategories = () =>
    axios
      .get(`${API}/categories/get.php`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(() => setCategories([]));
  useEffect(() => {
    loadUser();
  }, []);

  // logout
  const onLogout = async () => {
    try {
      await axios.get(`${API}/auth/logout.php`, { withCredentials: true });
    } catch {}
    setUser(null);
  };

  return (
    <>
      <Navbar user={user} categories={categories} onLogout={onLogout} />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<Category />} />

        {/* ส่ง setUser/loadUser ให้หน้า login เพื่ออัปเดต navbar ทันที */}
        <Route path="/login" element={<Login onLoginSuccess={loadUser} />} />
        <Route path="/register" element={<Register />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}