import React from "react";

interface FilterProps {
  minRating: number;
  keyword: string;
  onMinRatingChange: (rating: number) => void;
  onKeywordChange: (keyword: string) => void;
}

const FilterBar: React.FC<FilterProps> = ({
  minRating,
  keyword,
  onMinRatingChange,
  onKeywordChange,
}) => {
  return (
    <div style={{ margin: "20px 0" }}>
      <h3>Filter Feedback</h3>

      <label>
        Minimum Rating:{" "}
        <select
          value={minRating}
          onChange={(e) => onMinRatingChange(Number(e.target.value))}
        >
          <option value={0}>All</option>
          <option value={1}>1+</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
          <option value={5}>5 only</option>
        </select>
      </label>

      <label style={{ marginLeft: "20px" }}>
        Search:{" "}
        <input
          type="text"
          placeholder="Search by name or comments"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
      </label>
    </div>
  );
};

export default FilterBar;
