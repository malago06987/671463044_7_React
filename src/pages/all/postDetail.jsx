import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Like from "../../components/post/like";
import CommentForm from "../../components/comment/commentForm";
import CommentList from "../../components/comment/commentList";

const API = "http://localhost/671463044_7_REACT_API/api";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentRefreshKey, setCommentRefreshKey] = useState(0);

  const normalizePost = (p) => ({
    postID: Number(p?.postID ?? p?.id ?? id),
    title: p?.title ?? p?.topicName ?? "",
    content: p?.content ?? p?.postDetail ?? "",
    category_name: p?.category_name ?? p?.categoryName ?? "",
    userName: p?.userName ?? p?.username ?? "",
    likes: Number(p?.likes ?? 0),
    dislikes: Number(p?.dislikes ?? 0),
  });

  const fetchPost = useCallback(async () => {
    const res = await axios.get(`${API}/post/get_one.php?id=${id}`, {
      withCredentials: true,
    });
    const raw = res.data?.data ?? res.data?.post ?? res.data;
    setPost(normalizePost(raw));
  }, [id]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await fetchPost();
      } catch (e) {
        console.error(e);
        setPost(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchPost]);

  if (loading) {
    return (
      <div className="container py-4">
        <h4>Loading…</h4>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-4">
        <h3>ไม่พบโพสต์</h3>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          กลับ
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ maxWidth: 900 }}>
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← กลับ
      </button>

      <div className="card mb-3">
        <div className="card-body">
          <h3 className="card-title">{post.title || "-"}</h3>

          <div className="text-muted mb-2">
            หมวด: {post.category_name || "-"} | โดย: {post.userName || "-"}
          </div>

          <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>
            {post.content || ""}
          </p>

          <Like
            postID={post.postID}
            likes={post.likes}
            dislikes={post.dislikes}
            onUpdated={(r) =>
              setPost((p) => ({ ...p, likes: r.likes, dislikes: r.dislikes }))
            }
          />
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <CommentForm
            postID={post.postID}
            onCreated={() => setCommentRefreshKey((k) => k + 1)}
          />

          <CommentList postID={post.postID} refreshKey={commentRefreshKey} />
        </div>
      </div>
    </div>
  );
}