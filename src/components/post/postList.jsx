import PostCard from "./postCard";

export default function PostList({ items }) {
  return (
    <div className="row g-3">
      {items.map((p) => (
        <div className="col-12 col-md-6 col-lg-4" key={p.postID}>
          <PostCard post={p} />
        </div>
      ))}
    </div>
  );
}