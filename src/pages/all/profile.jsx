import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Profile({ onLogout }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    posts_count: "0",
    likes_count: "0",
    comments_count: "0",
  });

  // ตรวจสอบว่า Path ตรงกับที่รัน API จริงหรือไม่
  const API = "http://localhost/671463044_7_REACT_API/api";

  const fallbackAvatar =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
        <rect width="100%" height="100%" fill="#e9ecef"/>
        <circle cx="80" cy="62" r="28" fill="#ced4da"/>
        <rect x="34" y="98" width="92" height="46" rx="23" fill="#ced4da"/>
        <text x="50%" y="152" text-anchor="middle" font-family="Arial" font-size="12" fill="#6c757d">No Image</text>
      </svg>
    `);

  const loadProfile = async () => {
    try {
      const res = await axios.get(`${API}/profile/profile.php`, {
        withCredentials: true,
      });

      // ปรับเงื่อนไขการเช็คข้อมูลให้ยืดหยุ่นขึ้น
      if (res.data) {
        // กรณี API ส่งมาในรูปแบบ { status: 'success', user: {...} }
        if (res.data.status === "success") {
          setUser(res.data.user);
          setStats(res.data.stats || { posts_count: "0", likes_count: "0", comments_count: "0" });
        } 
        // กรณี API ส่ง Object user มาตรงๆ
        else if (res.data.user_id) {
          setUser(res.data);
        }
      } else {
        navigate("/login");
      }
    } catch (e) {
      console.error("Error loading profile:", e);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary mb-2"></div>
        <div className="text-muted">กำลังโหลดโปรไฟล์...</div>
      </div>
    );
  }

  if (!user) return null;

  // แก้ไข Key ให้ตรงกับฐานข้อมูล (user_name, img_user, email)
  const displayUsername = user.user_name || "ไม่ระบุชื่อ";
  
  // ปรับ Path รูปภาพให้ตรงกับที่เก็บในฝั่ง API (api/img/profile/)
  const imgPath = user.img_user 
    ? `http://localhost/671463044_7_REACT_API/api/img/profile/${user.img_user}`
    : fallbackAvatar;

  const email = user.email || "-";
  const joined = user.created_at
    ? new Date(user.created_at).toLocaleDateString("th-TH", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : "-";

  return (
    <div className="container py-4" style={{ maxWidth: 980 }}>
      <div className="card shadow-sm overflow-hidden border-0">
        <div
          style={{
            height: 160,
            background: "linear-gradient(135deg, #0d6efd, #198754)",
          }}
        />

        <div className="card-body px-4">
          <div className="d-flex flex-column flex-md-row gap-4 align-items-md-end">
            <div style={{ marginTop: -80 }}>
              <img
                src={imgPath}
                alt="profile"
                width="160"
                height="160"
                className="bg-white"
                style={{
                  objectFit: "cover",
                  borderRadius: "20px",
                  border: "6px solid white",
                  boxShadow: "0 8px 20px rgba(0,0,0,.1)",
                }}
                onError={(e) => {
                  e.currentTarget.src = fallbackAvatar;
                }}
              />
            </div>

            <div className="flex-grow-1 pb-1">
              <h2 className="fw-bold mb-1">{displayUsername}</h2>
              <div className="text-primary fw-medium mb-3">ผู้ใช้งานระบบ</div>

              <div className="row g-2">
                <div className="col-auto">
                   <span className="badge bg-light text-dark border p-2">
                     <i className="bi bi-envelope me-1"></i> {email}
                   </span>
                </div>
                <div className="col-auto">
                   <span className="badge bg-light text-dark border p-2">
                     <i className="bi bi-calendar-event me-1"></i> เริ่มใช้งาน: {joined}
                   </span>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2 mb-1">
              <Link className="btn btn-primary px-4" to="/my-post">
                โพสต์ของฉัน
              </Link>
              <button className="btn btn-danger" onClick={onLogout}>
                ออกจากระบบ
              </button>
            </div>
          </div>

          <hr className="my-4" />

          <div className="row g-3">
            <div className="col-6 col-md-4">
              <div className="card border-0 bg-light p-3 text-center">
                <div className="text-muted small mb-1">จำนวนโพสต์</div>
                <div className="h4 fw-bold mb-0">{stats.posts_count}</div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="card border-0 bg-light p-3 text-center">
                <div className="text-muted small mb-1">ไลค์ที่ได้รับ</div>
                <div className="h4 fw-bold mb-0">{stats.likes_count}</div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card border-0 bg-light p-3 text-center">
                <div className="text-muted small mb-1">คอมเมนต์</div>
                <div className="h4 fw-bold mb-0">{stats.comments_count}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2">
            <Link className="btn btn-link text-decoration-none ps-0" to="/">
               &larr; กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}