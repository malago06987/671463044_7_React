import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost/671463044_7_REACT_API/api/auth/login.php",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.ok) {
        navigate("/");
      } else {
        alert("เข้าสู่ระบบไม่สำเร็จ");
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
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <button className="btn btn-primary w-100">เข้าสู่ระบบ</button>
      </form>
    </div>
  );
}