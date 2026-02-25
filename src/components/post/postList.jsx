import PostCard from "./postCard";

export default function PostList({ items }) {
  return (
    <div className="list-group">
      {items.map((p) => (
        <PostCard key={p.postID} post={p} />
      ))}
    </div>
  );
}