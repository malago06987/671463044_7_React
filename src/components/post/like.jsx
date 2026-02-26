import { useState } from "react";
import axios from "axios";

const API = "http://localhost/671463044_7_REACT_API/api";

export default function Like({ postID, likes = 0, dislikes = 0, onUpdated }) {
  const [busy, setBusy] = useState(false);

  const vote = async (value) => {
    if (busy) return;
    setBusy(true);
    try {
      const res = await axios.post(
        `${API}/post/like.php`, // ✅ ใช้ like.php ของมึง
        { postID: Number(postID), value }, // ✅ ส่ง value: 1 / -1
        { withCredentials: true }
      );

      // ✅ อัปเดตตัวเลขทันทีจาก response
      if (onUpdated) onUpdated(res.data);
    } catch (e) {
      console.error(e);
      alert("โหวตไม่สำเร็จ (อาจยังไม่ได้ล็อกอิน)");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="d-flex gap-2">
      <button className="btn btn-primary" disabled={busy} onClick={() => vote(1)}>
        👍 Like ({likes})
      </button>
      <button className="btn btn-danger" disabled={busy} onClick={() => vote(-1)}>
        👎 Dislike ({dislikes})
      </button>
    </div>
  );
}