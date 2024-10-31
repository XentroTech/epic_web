import React, { useState } from "react";
// import axios from "axios";

const Prizes = () => {
  const [allData, setAllData] = useState([
    {
      id: 1,
      name: "Laptop",
      prize: "1st Prize",
      img: "https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_1280.jpg",
    },
    // Add more prizes...
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);

  // Function to open modal with prize data
  const handleUpdateClick = (prize) => {
    setSelectedPrize(prize);
    setIsModalOpen(true);
  };

  // Function to handle form input change
  const handleChange = (e) => {
    setSelectedPrize({ ...selectedPrize, [e.target.name]: e.target.value });
  };

  // Function to submit updated prize details to the API
  const handleUpdatePrize = async (e) => {
    e.preventDefault();
    // try {
    //   // const response = await axios.put(
    //   //   `/api/prizes/${selectedPrize.id}`,
    //   //   selectedPrize
    //   // );
    //   // Update the prize data in allData
    //   setAllData((prevData) =>
    //     prevData.map((item) =>
    //       item.id === selectedPrize.id ? response.data : item
    //     )
    //   );
    //   setIsModalOpen(false); // Close the modal
    // } catch (error) {
    //   console.error("Error updating prize:", error);
    // }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-2xl font-bold leading-tight pb-8 text-green-600 text-left ">
        Game Management
      </h2>
      <h3 className="text-xl font-semibold leading-tight pb-4 text-slate-600 text-left">
        Prizes
      </h3>

      {/* Table of prizes */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Position</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allData.map((prize) => (
              <tr key={prize.id} className="bg-white">
                <td className="px-6 py-4">
                  <img src={prize.img} alt={prize.name} width={50} />
                </td>
                <td className="px-6 py-4">{prize.prize}</td>
                <td className="px-6 py-4">{prize.name}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleUpdateClick(prize)}
                    className="text-white bg-cyan-500 hover:bg-cyan-600 font-medium rounded-lg text-xs px-5 py-2.5"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {isModalOpen && selectedPrize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Update Prize
            </h3>
            <form onSubmit={handleUpdatePrize}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Image
                </label>
                <input
                  type="file"
                  name="name"
                  value={selectedPrize.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={selectedPrize.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Position
                </label>
                <input
                  type="text"
                  name="prize"
                  value={selectedPrize.prize}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prizes;
