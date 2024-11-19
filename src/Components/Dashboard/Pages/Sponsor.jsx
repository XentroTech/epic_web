import React, { useState, useEffect } from "react";
import coinImg from "../../../assets/epic_coin.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useCreateSponsorMutation,
  useDeleteSponsorMutation,
  useGetSponsorQuery,
  useUpdateSponsorMutation,
} from "../../../features/finance/sponsorApi";
import { BiPlus } from "react-icons/bi";

function Sponsor() {
  const [showModal, setShowModal] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [adLocation, setAdLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState("");
  const { data, refetch } = useGetSponsorQuery();
  const sponsor = data?.sponsorships || [];
  const displayedSponsorInfo = showAll ? sponsor : sponsor.slice(0, 3);

  const [createSponsor] = useCreateSponsorMutation();
  const [deleteSponsor] = useDeleteSponsorMutation();
  const [updateSponsor] = useUpdateSponsorMutation();

  //handle create
  const handleCreate = async () => {
    if (brandName && adLocation && imageFile && startDate && endDate) {
      const newSponsor = new FormData();
      newSponsor.append("brandName", brandName);
      newSponsor.append("adLocation", adLocation);
      newSponsor.append("startDate", startDate);
      newSponsor.append("endDate", endDate);
      if (imageFile) {
        newSponsor.append("image_url", imageFile);
      }

      try {
        if (editingIndex !== null) {
          await updateSponsor({
            id: editingId,
            data: newSponsor,
          }).unwrap();
          toast.success("Sponsor Updated Successfully!", {
            position: "top-right",
          });
        } else {
          await createSponsor(newSponsor).unwrap();
          toast.success("Sponsor Created!", { position: "top-right" });
        }

        // Clear form fields
        setBrandName("");
        setAdLocation("");
        setStartDate("");
        setEndDate("");
        setImageFile(null);
        setShowModal(false);
        setEditingIndex(null);
        setEditingId(null);
        refetch();
      } catch (error) {
        toast.error(`${error.message}`, { position: "top-right" });
        setError(error.message);
      }
    }
  };
  // handle delete
  const handleDelete = async (id) => {
    try {
      await deleteSponsor(id).unwrap();
      toast.success("Sponsor has been Deleted!", { position: "top-right" });
      refetch();
    } catch (error) {
      toast.error(`Failed to delete sponsor: ${error.message}`, {
        position: "top-right",
      });
    }
  };

  //handle update
  const handleUpdate = (index, id) => {
    setEditingIndex(index);
    setEditingId(id);
    setBrandName(sponsor[index].brandName);
    setAdLocation(sponsor[index].adLocation);
    setStartDate(sponsor[index].startDate);
    setEndDate(sponsor[index].endDate);
    setImageFile(null);
    setShowModal(true);
  };
  //handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingIndex(null);
    setBrandName("");
    setAdLocation("");
    setStartDate("");
    setEndDate("");
    setImageFile(null);
    setError("");
  };
  // handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-2xl font-bold text-green-600 p-4">
        Sponsor Management
      </h1>
      <div className="flex justify-center items-center mx-auto">
        <button
          onClick={() => setShowModal(true)}
          className="text-xl  text-green-600 font-bold border border-green-600 rounded px-8 py-4 hover:bg-green-600 hover:text-white  transform hover:scale-105 transition duration-500"
        >
          <span>Create Sponsor</span> +
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {error && <p className="bg-red-500 text-white">{error}</p>}
          <div className="bg-white rounded-lg p-6 w-120">
            <h2 className="text-xl font-bold mb-4 text-green-600">
              {editingIndex !== null ? "Update" : "Create"} Sponsor
            </h2>

            <div className="mb-4">
              <input
                type="file"
                name="image_url"
                id="file-input"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => document.getElementById("file-input").click()}
                className="mx-auto border hover:text-white p-4 rounded-md hover:bg-green-700 flex items-center justify-center"
              >
                Image
                <BiPlus />
              </button>
              {imageFile && (
                <p className="mt-2 text-gray-600">{imageFile.name}</p>
              )}
            </div>

            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Brand Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Brand Name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 mb-4"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Ad Location
                </label>
                <input
                  type="text"
                  placeholder="Enter Ad Location"
                  value={adLocation}
                  onChange={(e) => setAdLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 mb-4"
                />
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleCreate}
                className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-700"
              >
                {editingIndex !== null ? "Update" : "Create"}
              </button>
              <button
                onClick={handleCloseModal}
                className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table of Sponsor management */}
      <div className="mt-6 overflow-x-auto shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Image
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Brand Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Ad Location
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Start Date
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                End Date
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedSponsorInfo.map((sponsor, index) => (
              <tr key={sponsor._id}>
                <td className="px-6 py-4 border-b border-gray-200">
                  <img
                    src={sponsor.image_url}
                    alt="Sponsor"
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {sponsor.brandName}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-500">
                  {sponsor.adLocation}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-500">
                  {new Date(sponsor.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-500">
                  {new Date(sponsor.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <button
                    onClick={() => handleUpdate(index, sponsor._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-700 transform hover:scale-105 transition duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(sponsor._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transform hover:scale-105 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sponsor.length > 3 && !showAll && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll(true)}
            className="text-green-600 font-bold hover:text-green-700"
          >
            Show More
          </button>
        </div>
      )}
      {showAll && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll(false)}
            className="text-green-600 font-bold hover:text-green-700"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
}

export default Sponsor;
