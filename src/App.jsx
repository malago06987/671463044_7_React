import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/include/Navbar";

import Home from "./pages/all/Home";
import Category from "./pages/all/Category";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import PostDetail from "./pages/all/postDetail";
import MyPost from "./pages/all/my_post";
import Profile from "./pages/all/profile";
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

  const loadUser = async () => {
    try {
      const res = await axios.get(`${API}/auth/activeUser.php`, {
        withCredentials: true,
      });
      if (res.data.status === "success") setUser(res.data.user);
      else setUser(null);
    } catch {
      setUser(null);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await axios.get(`${API}/categories/get.php`);
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      setCategories([]);
    }
  };

  useEffect(() => {
    loadUser();
    loadCategories();
  }, []);

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
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/login" element={<Login onLoginSuccess={loadUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/my-post" element={<MyPost />} />
        <Route path="/profile" element={<Profile user={user} onLogout={onLogout} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}