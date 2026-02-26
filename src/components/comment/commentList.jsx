import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost/671463044_7_REACT_API/api";

const normalizeComments = (raw) => {
  // รองรับทั้งแบบ [] และ {status,data:[]}
  const arr = Array.isArray(raw) ? raw : raw?.data ?? [];
  return (Array.isArray(arr) ? arr : []).map((c) => ({
    id: c.commentID ?? c.commentsID ?? c.id,
    userID: c.userID,
    userName: c.userName ?? c.username ?? "ผู้ใช้",
    content: c.commentText ?? c.content ?? c.comment ?? c.commentDetail ?? "",
    createdAt: c.createdAt ?? c.created_at ?? "",
  }));
};

export default function CommentList({ postID, refreshKey = 0 }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    if (!postID) return;

    setLoading(true);
    try {
      const res = await axios.get(`${API}/comments/getComment.php?post_id=${postID}`);
      setComments(normalizeComments(res.data));
    } catch (err) {
      console.error(err);
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [postID]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments, refreshKey]);

  if (loading) return <div className="text-muted">กำลังโหลดคอมเมนต์…</div>;

  return (
    <>
      <h5 className="mb-3">ความคิดเห็น ({comments.length})</h5>

      {comments.length === 0 ? (
        <div className="text-muted">ยังไม่มีความคิดเห็น</div>
      ) : (
        comments.map((c) => (
          <div key={c.id} className="border rounded p-2 mb-2">
            <div className="fw-semibold">{c.userName}</div>
            <div style={{ whiteSpace: "pre-wrap" }}>{c.content}</div>
            <div className="text-muted" style={{ fontSize: 12 }}>
              {c.createdAt}
            </div>
          </div>
        ))
      )}
    </>
  );
}