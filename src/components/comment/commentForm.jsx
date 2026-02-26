import { useState } from "react";
import axios from "axios";

const API = "http://localhost/671463044_7_REACT_API/api";

export default function CommentForm({ postID, onCreated }) {
  const [commentText, setCommentText] = useState("");
  const [sending, setSending] = useState(false);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const text = commentText.trim();
    if (!text) return alert("พิมพ์คอมเมนต์ก่อนนะ");

    setSending(true);
    try {
      // ⚠️ ให้ส่ง field แบบหลังบ้านมึงใช้จริง: postID + commentText
      const res = await axios.post(
        `${API}/comments/create.php`,
        { postID, commentText: text },
        { withCredentials: true }
      );

      if (res.data?.status === "success") {
        setCommentText("");
        onCreated?.(); // ให้ parent ไปโหลด comments ใหม่
      } else {
        alert(res.data?.message || "คอมเมนต์ไม่สำเร็จ");
      }
    } catch (err) {
      console.error(err);
      alert("คอมเมนต์ไม่สำเร็จ (อาจยังไม่ได้ล็อกอิน)");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleAddComment} className="mb-3">
      <textarea
        className="form-control mb-2"
        rows={3}
        placeholder="เขียนความคิดเห็น…"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        disabled={sending}
      />
      <button className="btn btn-success" disabled={sending}>
        {sending ? "กำลังส่ง…" : "ส่งความคิดเห็น"}
      </button>
    </form>
  );
}