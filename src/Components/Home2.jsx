import React, { useState } from 'react';
import { FiGrid, FiImage, FiMusic, FiSearch, FiVideo } from 'react-icons/fi';
import { useGetImagesQuery } from "../features/images/imageApi";

// Categories data
const categories = [
  { icon: FiImage, name: 'Photos', count: '2.3M+' },
  { icon: FiGrid, name: 'Vectors', count: '1.8M+' },
  { icon: FiVideo, name: 'Videos', count: '150K+' },
  { icon: FiMusic, name: 'Music', count: '50K+' },
];

const trendingTopics = ['Nature', 'Business', 'Abstract', 'Food', 'Technology'];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data: imageData, isLoading, isError } = useGetImagesQuery({ 
    searchQuery: searchTerm, 
    currentPage 
  });
  const images = imageData?.images || [];

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="pt-[150px] relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
            All the assets you need, in one place
          </h1>
          <p className="text-xl text-center mb-8 text-blue-100">
            Find and download the best high-quality photos, designs, and mockups
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-6 pr-12 text-gray-900 border-0 rounded-lg text-lg focus:ring-2 focus:ring-blue-400"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 bg-green-600 text-white rounded-lg px-8 py-3 hover:bg-blue-700 transition-colors">
                <FiSearch className="w-6 h-6" />
              </button>
            </div>
          </form>

          {/* Trending Topics */}
          <div className="flex flex-wrap justify-center gap-3">
            {trendingTopics.map(topic => (
              <button
                key={topic}
                className="px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(({ icon: Icon, name, count }) => (
              <div key={name} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <Icon className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-lg">{name}</h3>
                <p className="text-gray-600">{count} resources</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Images Grid Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Featured Resources</h2>
          
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          )}
          
          {isError && (
            <div className="text-center text-red-500 py-12">
              Error loading images. Please try again later.
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <div key={index} className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={image.url}
                  alt={image.description}
                  className="w-full aspect-[3/2] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <button className="w-full bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {images.length > 0 && (
            <div className="mt-12 text-center">
              <button
                onClick={handleLoadMore}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
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
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiImage className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">High Quality Resources</h3>
              <p className="text-gray-600">Access millions of carefully curated, high-quality images and vectors.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiGrid className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">New Content Daily</h3>
              <p className="text-gray-600">Thousands of new resources added every day to keep content fresh.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiVideo className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Simple Licensing</h3>
              <p className="text-gray-600">Clear and simple licensing terms for all your projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="container mx-auto  ">
      <h1 className="text-center text-green-600 py-24 font-bold text-3xl">
        Download App
      </h1>{" "}
      <div className="flex md:ml-auto md:mr-0 mx-auto items-center justify-center flex-shrink-0 space-x-4">
        <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-6 h-6"
            viewBox="0 0 512 512"
          >
            <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
          </svg>
          <span className="ml-4 flex items-start flex-col leading-none">
            <span className="text-xs text-gray-600 mb-1">GET IT ON</span>
            <span className="title-font font-medium">Google Play</span>
          </span>
        </button>
        <button className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-6 h-6"
            viewBox="0 0 305 305"
          >
            <path d="M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z"></path>
            <path d="M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z"></path>
          </svg>
          <span className="ml-4 flex items-start flex-col leading-none">
            <span className="text-xs text-gray-600 mb-1">Download on the</span>
            <span className="title-font font-medium">App Store</span>
          </span>
        </button>
      </div>
    </section>
    </div>
  );
}

