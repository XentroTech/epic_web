import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useGetCategoryQuery } from '../features/images/categoryApi';

const Categories = ({ onCategorySelect }) => {
  const { data: categoryData, isLoading, isError } = useGetCategoryQuery();
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const categories = categoryData?.categories || [];
  const itemsToShow = 5; // Number of categories to show at once

  useEffect(() => {
    if (categories) {
      setVisibleCategories(categories.slice(startIndex, startIndex + itemsToShow));
    }
  }, [categories, startIndex]);

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, categories.length - itemsToShow));
  };

  if (isLoading) return <div className="text-center py-4">Loading categories...</div>;
  if (isError) return <div className="text-center py-4 text-red-500">Error loading categories</div>;

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={handlePrev}
        className="absolute left-0 bg-white p-2 rounded-full shadow-md z-10 disabled:opacity-50"
        disabled={startIndex === 0}
        aria-label="Previous categories"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <div className="flex space-x-4 py-4 px-12">
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className="px-4 py-2 bg-white text-green-600 rounded-full transition-colors hover:bg-green-100"
          >
            {category.name}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="absolute right-0 bg-white p-2 rounded-full shadow-md z-10 disabled:opacity-50"
        disabled={startIndex >= categories.length - itemsToShow}
        aria-label="Next categories"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Categories;

