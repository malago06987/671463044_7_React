export default function Search({ searchQuery, handleSearchChange }) {
  return (
    <div className="mb-3">
      <input
        className="form-control"
        placeholder="ค้นหาโพสต์"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
}