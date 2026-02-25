import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost/671463044_7_REACT_API/api/auth/register.php",
        { nickName, email, password },
        { withCredentials: true }
      );

      if (res.data.ok) {
        navigate("/login");
      } else {
        alert("สมัครสมาชิกไม่สำเร็จ");
      }
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4">สมัครสมาชิก</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ชื่อผู้ใช้</label>
          <input
            className="form-control"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            required
          />
        </div>

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

        <button className="btn btn-success w-100">สมัครสมาชิก</button>
      </form>
    </div>
  );
}