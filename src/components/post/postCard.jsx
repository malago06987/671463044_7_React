import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="card h-100">
      {post.postImage && (
        <img src={post.postImage} className="card-img-top" alt="" />
      )}

      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <span className="badge text-bg-secondary">
            {post.categoryName || "ไม่มีหมวด"}
          </span>
          <small className="text-muted">{post.created_at || ""}</small>
        </div>

        <h5 className="card-title mt-2">{post.topicName || "ไม่มีหัวข้อ"}</h5>

        <p className="card-text">
          {(post.postDetail || "").slice(0, 90)}
          {(post.postDetail || "").length > 90 ? "..." : ""}
        </p>

        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">โดย {post.nickName || "ไม่ระบุ"}</small>
          <span className="badge text-bg-light">👍 {post.likeCount || 0}</span>
        </div>

        <div className="mt-3">
          <Link className="btn btn-sm btn-primary" to={`/post/${post.postID}`}>
            อ่านต่อ
          </Link>
        </div>
      </div>
    </div>
  );
}