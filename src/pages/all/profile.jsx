import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Profile({ onLogout }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    posts_count: "-",
    likes_count: "-",
    comments_count: "-",
  });

  const API = "http://localhost/671463044_7_REACT_API/api";

  // ✅ placeholder ไม่พึ่งเน็ต
  const fallbackAvatar =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
        <rect width="100%" height="100%" fill="#e9ecef"/>
        <circle cx="80" cy="62" r="28" fill="#ced4da"/>
        <rect x="34" y="98" width="92" height="46" rx="23" fill="#ced4da"/>
        <text x="50%" y="152" text-anchor="middle"
          font-family="Arial" font-size="12" fill="#6c757d">No Image</text>
      </svg>
    `);

  const loadProfile = async () => {
    try {
      const res = await axios.get(`${API}/profile/profile.php`, {
        withCredentials: true,
      });

      if (res.data.status === "success") {
        setUser(res.data.user);
        setStats(
          res.data.stats || { posts_count: "-", likes_count: "-", comments_count: "-" }
        );
      } else {
        navigate("/login");
      }
    } catch (e) {
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-muted">กำลังโหลดโปรไฟล์...</div>
      </div>
    );
  }

  if (!user) return null;

  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  // ✅ รูป: ถ้ามีชื่อไฟล์ก็ยิงไป path ที่ serve ได้, ถ้าไม่มีก็ใช้ data URL
  const img = user.userImage
    ? `http://localhost/671463044_7_REACT_API/img/profile/${user.userImage}`
    : fallbackAvatar;

  const email = user.email || "-";
  const bio = user.bio || "ยังไม่มีคำอธิบายโปรไฟล์";
  const joined = user.created_at
    ? new Date(user.created_at).toLocaleDateString("th-TH")
    : "-";

  return (
    <div className="container py-4" style={{ maxWidth: 980 }}>
      <div className="card shadow-sm overflow-hidden">
        <div
          style={{
            height: 160,
            background:
              "linear-gradient(135deg, rgba(13,110,253,.9), rgba(25,135,84,.85))",
          }}
        />

        <div className="card-body">
          <div className="d-flex flex-column flex-md-row gap-3 align-items-md-end">
            <div style={{ marginTop: -80 }}>
              <img
                src={img}
                alt="profile"
                width="160"
                height="160"
                style={{
                  objectFit: "cover",
                  borderRadius: "18px",
                  border: "6px solid white",
                  boxShadow: "0 6px 18px rgba(0,0,0,.15)",
                  background: "#fff",
                }}
                onError={(e) => {
                  e.currentTarget.src = fallbackAvatar; // ✅ ไม่พึ่งเน็ต
                }}
              />
            </div>

            <div className="flex-grow-1">
              <h3 className="mb-1">{fullName || "ไม่ระบุชื่อ"}</h3>
              <div className="text-muted mb-2">@{user.userName}</div>

              <div className="small text-muted">
                <div>
                  <b>อีเมล:</b> {email}
                </div>
                <div>
                  <b>เข้าร่วมเมื่อ:</b> {joined}
                </div>
              </div>
            </div>

            <div className="d-flex gap-2 flex-wrap justify-content-md-end">
              <Link className="btn btn-primary" to="/my-post">
                โพสต์ของฉัน
              </Link>

              <button
                className="btn btn-outline-secondary"
                onClick={() => alert("ยังไม่ได้ทำหน้าแก้ไขโปรไฟล์ 😅")}
              >
                แก้ไขโปรไฟล์
              </button>

              <button className="btn btn-danger" onClick={onLogout}>
                ออกจากระบบ
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h6 className="mb-2">เกี่ยวกับฉัน</h6>
            <div className="text-muted">{bio}</div>
          </div>

          <div className="row mt-4 g-3">
            <div className="col-12 col-md-4">
              <div className="border rounded-3 p-3 h-100">
                <div className="text-muted small">โพสต์</div>
                <div className="fs-4 fw-bold">{stats.posts_count}</div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="border rounded-3 p-3 h-100">
                <div className="text-muted small">ไลค์ที่ได้รับ</div>
                <div className="fs-4 fw-bold">{stats.likes_count}</div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="border rounded-3 p-3 h-100">
                <div className="text-muted small">คอมเมนต์</div>
                <div className="fs-4 fw-bold">{stats.comments_count}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 d-flex gap-2">
            <button className="btn btn-outline-dark" onClick={() => navigate(-1)}>
              กลับ
            </button>
            <Link className="btn btn-outline-primary" to="/">
              หน้าแรก
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}