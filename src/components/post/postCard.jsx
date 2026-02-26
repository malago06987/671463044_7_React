import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const imageUrl = post.postImage
    ? `http://localhost/671463044_7_React_API/api/${post.postImage}`
    : null;

  return (
    <Link
      to={`/post/${post.postID}`}
      className="list-group-item list-group-item-action"
      style={{ textDecoration: "none" }}
    >
      <div className="row align-items-center g-3">

        {/* รูป */}
       <div className="col-3 col-md-2">
  <div className="ratio ratio-4x3 rounded overflow-hidden">
    {imageUrl ? (
      <img
        src={imageUrl}
        alt=""
        className="w-100 h-100 object-fit-cover"
        style={{ objectFit: "cover" }}
      />
    ) : (
      <div className="bg-light text-muted d-flex align-items-center justify-content-center">
        ไม่มีรูป
      </div>
    )}
  </div>
</div>

        {/* เนื้อหา */}
        <div className="col-9 col-md-8">
          <div className="d-flex justify-content-between">
            <span className="badge bg-secondary">
              {post.categoryName || "ไม่มีหมวด"}
            </span>
            <small className="text-muted">
              {post.created_at || ""}
            </small>
          </div>

          <h6 className="mt-2 mb-1 fw-semibold">
            {post.topicName || "ไม่มีหัวข้อ"}
          </h6>

          <p className="mb-1 text-muted small">
            {(post.postDetail || "").slice(0, 120)}
            {(post.postDetail || "").length > 120 ? "..." : ""}
          </p>

          <small className="text-muted">
            โดย {post.userName || "ไม่ระบุ"}
          </small>
        </div>

        {/* สถิติ */}
<div className="col-12 col-md-2 text-md-end">
  <span className="badge bg-light text-dark me-2">
    👍 {post.likes ?? 0}
  </span>

  <span className="badge bg-light text-dark me-2">
    👎 {post.dislikes ?? 0}
  </span>

  {post.commentCount !== undefined && (
    <span className="badge bg-light text-dark">
      💬 {post.commentCount}
    </span>
  )}
</div>

      </div>
    </Link>
  );
}