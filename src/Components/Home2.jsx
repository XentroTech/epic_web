import React, { useState } from "react";
import { FiGrid, FiImage, FiMusic, FiSearch, FiVideo } from "react-icons/fi";
import Categories from "../components/Categories";
import ImageModal from "../components/ImageModal";
import { useGetImagesQuery } from "../features/images/imageApi";
import AppInfo from "./AppInfo";
// Categories data
const categories = [
  { icon: FiImage, name: "Photos", count: "2.3M+" },
  { icon: FiGrid, name: "Vectors", count: "1.8M+" },
  { icon: FiVideo, name: "Videos", count: "150K+" },
  { icon: FiMusic, name: "Music", count: "50K+" },
];

const trendingTopics = ["Nature", "Business", "Abstract", "Food", "Technology"];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {
    data: imageData,
    isLoading,
    isError,
  } = useGetImagesQuery({
    searchQuery: searchTerm,
    currentPage,
    category: selectedCategory,
  });
  const images = imageData?.images || [];

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setSelectedCategory(null);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setSearchTerm("");
  };

  const getImageSpanClasses = (image) => {
    const random = Math.random();
    if (random < 0.3) return "row-span-2";
    if (random < 0.5) return "col-span-2";
    if (random < 0.6) return "col-span-2 row-span-2";
    return "";
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#016655] to-[#016635] text-white pt-40 pb-20 px-4">
        <div className="container mx-auto max-w-6xl pt-12">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
            All the images you need, in one place
          </h1>
          <p className="text-xl text-center mb-8 text-green-100">
            Find and download the best high-quality photos.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pr-12 text-gray-900 border-0 rounded-full text-lg focus:ring-2 focus:ring-green-400"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#016655] text-white rounded-full px-8 py-3 hover:bg-green-600 transition-colors"
              >
                <FiSearch className="w-6 h-6" />
              </button>
            </div>
          </form>
          {/* Trending Topics */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
            <span className="text-green-200 mr-2">Trending:</span>
            {trendingTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSearchTerm(topic)}
                className="px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-sm"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Categories */}
      <div className=" flex flex-col justify-center items-center py-24">
        <h2 className="category text-3xl font-bold text-[#016655] font bold py-12">
          Choose Categories
        </h2>
        <Categories onCategorySelect={handleCategorySelect} />
      </div>
      {/* Images Grid Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold mb-8 text-[#016655]">
            {selectedCategory
              ? `${selectedCategory} Images`
              : "Featured Resources"}
          </h2>

          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            </div>
          )}

          {isError && (
            <div className="text-center text-red-500 py-12">
              Error loading images. Please try again later.
            </div>
          )}

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            {images.map((image, index) => {
              const spanClasses = getImageSpanClasses(image);
              return (
                <div
                  key={index}
                  className={`group relative rounded-lg overflow-hidden cursor-pointer ${spanClasses}`}
                  onClick={() => setSelectedImage(image)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedImage(image);
                    }
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.description}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm mb-2 line-clamp-2">
                        {image.description}
                      </p>
                      <button
                        className="w-full bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(image.url, "_blank");
                        }}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {images.length > 0 && (
            <div className="mt-12 text-center">
              <button
                onClick={handleLoadMore}
                className="bg-[#016655] text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#016655]">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#016655] rounded-full flex items-center justify-center mx-auto mb-4">
                <FiImage className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#016655]">
                High Quality Resources
              </h3>
              <p className="text-gray-600">
                Access millions of carefully curated, high-quality images and
                vectors.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#016655] rounded-full flex items-center justify-center mx-auto mb-4">
                <FiGrid className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#016655]">
                New Content Daily
              </h3>
              <p className="text-gray-600">
                Thousands of new resources added every day to keep content
                fresh.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#016655] rounded-full flex items-center justify-center mx-auto mb-4">
                <FiVideo className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#016655]">
                Simple Licensing
              </h3>
              <p className="text-gray-600">
                Clear and simple licensing terms for all your projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App download info Section */}
      <div className="app">
        <AppInfo />
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
