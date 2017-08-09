import React from 'react';
import CategoryList from './CategoryList';
import SortList from './SortList';

export default ({ onCategoryClick, category, sortBy, onSortByClick }) => {
  return (
    <aside className="menu column is-2">
      <CategoryList onCategoryClick={onCategoryClick} category={category} />

      <hr />

      <SortList sortBy={sortBy} onSortByClick={onSortByClick} />
    </aside>
  );
};
