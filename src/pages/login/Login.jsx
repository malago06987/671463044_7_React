import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ onLoginSuccess }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost/671463044_7_REACT_API/api/auth/login.php",
        { userName, password },
        { withCredentials: true }
      );

      if (res.data.status === "success") {
        // ✅ ส่ง user ให้ App setUser ทันที (ต้องให้ PHP ส่ง user กลับมาด้วย)
        onLoginSuccess?.(res.data.user);

        navigate("/");
      } else {
        alert(res.data.message || "เข้าสู่ระบบไม่สำเร็จ");
      }
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4">เข้าสู่ระบบ</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">userName</label>
          <input
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-100" type="submit">
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
}