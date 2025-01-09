import React, { useState, useEffect } from "react";
import coinImg from "../../../assets/epic_coin.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useCreateCoinInfoMutation,
  useDeleteCoinInfoMutation,
  useGetCoinInfoQuery,
  useUpdateCoinInfoMutation,
} from "../../../features/finance/coinApi";

function CoinManagement() {
  const [showModal, setShowModal] = useState(false);
  const [price, setPrice] = useState("");
  const [coin, setCoin] = useState("");
  const [extraCoins, setExtraCoins] = useState(0);
  const [promoExpiration, setPromoExpiration] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const { data, refetch } = useGetCoinInfoQuery();
  const coinInfo = data?.coinInfo;

  const [createCoinInfo] = useCreateCoinInfoMutation();
  const [deleteCoinInfo] = useDeleteCoinInfoMutation();
  const [updateCoinInfo] = useUpdateCoinInfoMutation();

  const handleCreate = async () => {
    if (price && coin) {
      const newCoinInfo = {
        price,
        coin,
        image_url: "https://via.placeholder.com/150",
        extraCoins,
        promoExpiration,
      };

      try {
        if (editingIndex !== null) {
          // Update existing entry
          await updateCoinInfo({
            id: editingId,
            data: newCoinInfo,
          }).unwrap();
          toast.success(`Coin Info Updated Successfully!`, {
            position: "top-right",
          });
        } else {
          // Add new entry
          try {
            await createCoinInfo(newCoinInfo).unwrap();
            toast.success(` Coin Info Created!`, {
              position: "top-right",
            });
          } catch (err) {
            toast.error(`${err?.data?.message}`, {
              position: "top-right",
            });
          }
        }

        setPrice("");
        setCoin("");
        setExtraCoins(0);
        setPromoExpiration("");
        setShowModal(false);
        setEditingIndex(null);
        setEditingId(null);
        refetch();
      } catch (error) {
        toast.error(` ${error.message}`, {
          position: "top-right",
        });
      }
    }
  };

  const handleDelete = async (id) => {
    await deleteCoinInfo(id).unwrap();
    toast.success(` Coin Info Deleted!`, {
      position: "top-right",
    });
    refetch();
  };

  const handleUpdate = (index, id) => {
    setEditingIndex(index);
    setEditingId(id);
    setPrice(coinInfo[index].price);
    setCoin(coinInfo[index].coin);
    setExtraCoins(coinInfo[index].extraCoins || 0);
    setPromoExpiration(coinInfo[index].promoExpiration || "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingIndex(null);
    setPrice("");
    setCoin("");
    setExtraCoins(0);
    setPromoExpiration("");
  };

  return (
    <div className="p-4 container mx-auto">
      <h1 className="text-2xl font-bold text-green-600 p-4">Coin Management</h1>
      <div className="flex justify-center items-center mx-auto">
        <button
          onClick={() => setShowModal(true)}
          className="text-xl text-green-600 border-green-600 font-bold border rounded px-8 py-4 hover:bg-green-600 hover:text-white transform hover:scale-105 transition duration-500"
        >
          <span>Create Coin</span> +
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-xl font-semibold mb-4">
              {editingIndex !== null ? "Update" : "Create"} Coin
            </h2>

            <input
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <input
              type="text"
              placeholder="Enter coin"
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />

            {/* Extra Coins Field */}
            <input
              type="number"
              placeholder="Enter extra coins (for promo)"
              value={extraCoins}
              onChange={(e) => setExtraCoins(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />

            {/* Promo Expiration Date Field */}
            <input
              type="date"
              value={promoExpiration}
              onChange={(e) => setPromoExpiration(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleCreate}
                className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-700"
              >
                {editingIndex !== null ? "Update" : "Create"}
              </button>
              <button
                onClick={handleCloseModal}
                className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-yellow-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table of coin management */}
      <div className="mt-6 overflow-x-auto shadow-md z-10">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Image
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Price
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Coin
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Extra Coins (Promo)
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Promo Expiration
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {coinInfo?.map((coin, index) => (
              <tr key={coin._id}>
                <td className="px-6 py-4 border-b border-gray-200">
                  <img
                    src={coinImg}
                    alt="Coin"
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {coin.price}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-500">
                  {coin.coin}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-500">
                  {coin.extraCoins || "No Promo"}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-500">
                  {coin.promoExpiration ? (
                    <span>
                      {new Date(coin.promoExpiration).toLocaleDateString()}
                    </span>
                  ) : (
                    "No Expiration"
                  )}
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  <button
                    onClick={() => handleUpdate(index, coin._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-700 transform hover:scale-105 transition duration-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(coin._id)}
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
    </div>
  );
}

export default CoinManagement;
