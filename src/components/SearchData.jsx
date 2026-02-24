import React from "react";

const SearchData = ({ searchQuery, handleSearchChange, placeholder }) => {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder={placeholder || "ค้นหา..."}
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchData;