import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("unknown");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost/671463044_7_REACT_API/api/auth/register.php",
        { userName, firstName, lastName, gender, email, password },
        { withCredentials: true }
      );

      if (res.data.status === "success") {
        alert("สมัครสมาชิกสำเร็จ!");
        navigate("/login");
      } else {
        alert(res.data.message || "สมัครสมาชิกไม่สำเร็จ");
      }
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด (เช็ค CORS/API/Console)");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 400 }}>
      <h3 className="mb-4">สมัครสมาชิก</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ชื่อผู้ใช้</label>
          <input
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">ชื่อจริง</label>
          <input
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="(ไม่ใส่ก็ได้)"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">นามสกุล</label>
          <input
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="(ไม่ใส่ก็ได้)"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">เพศ</label>
          <select
            className="form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="unknown">ไม่ระบุ</option>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
            <option value="other">อื่น ๆ</option>
          </select>
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

        <button className="btn btn-success w-100" type="submit">
          สมัครสมาชิก
        </button>
      </form>
    </div>
  );
}