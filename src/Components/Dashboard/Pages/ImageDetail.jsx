import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  useApproveImageMutation,
  useDeleteImageMutation,
  useGetImageQuery,
} from "../../../features/images/imageApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillCamera, AiFillDelete } from "react-icons/ai";
import epic_coin from "../../../assets/epic_coin.png";

const ImageDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetImageQuery(id);
  const image = data?.image;

  // Handle delete image
  const [deleteImage] = useDeleteImageMutation();
  const handleDeleteImage = (id) => {
    deleteImage(id)
      .unwrap()
      .then((data) => {
        if (data.success) {
          toast.success("Image deleted successfully!", {
            position: "top-right",
          });
        }
      })
      .catch((error) =>
        toast.error(error.data.message, { position: "top-right" })
      );
  };
  //handle approve Image
  const [approveImage] = useApproveImageMutation();
  const handleApproveImage = (id) => {
    approveImage(id)
      .unwrap()
      .then((data) => {
        if (data.success) {
          toast.success(`Image has been approved!`, {
            position: "top-right",
          });
        }
      })
      .catch((error) =>
        toast.error(error.data.message, { position: "top-right" })
      );
  };
  return (
    <>
      {isLoading ? (
        <div>
          <p className="text-center py-4 text-gray-500">Loading...</p>
        </div>
      ) : isError ? (
        <div>
          <p className="text-center py-4 text-red-600">
            Error: {error.message}
          </p>
        </div>
      ) : (
        image && (
          <div>
            <div className="flex flex-col md:flex-row p-6 border rounded-lg shadow-lg h-3/4 bg-gradient-to-br from-gray-100 to-white">
              {/* Left Side: Image */}
              <div className="flex-1 flex justify-center items-center">
                <img
                  src={image?.image_url}
                  alt={image?.title}
                  className="w-full h-[500px] object-cover rounded-lg shadow-xl transform hover:scale-105 transition duration-500"
                />
              </div>

              {/* Right Side: Details */}
              <div className="flex-1 md:ml-8 mt-6 md:mt-0">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                  Title:{" "}
                  <span className="text-2xl font-medium"> {image?.title}</span>
                </h2>

                <p className="text-lg font-semibold mb-3 text-gray-700">
                  Price:
                  <span className="flex items-center gap- font-bold text-emerald-500">
                    {image?.price}
                    <img src={epic_coin} alt="coin icon" className="w-5 h-5" />
                  </span>
                </p>

                <p className="text-lg font-semibold mb-3 text-gray-700">
                  Likes:{" "}
                  <span className="font-light"> {image?.likesCount}</span>
                </p>
                <p className="text-lg font-semibold mb-3 text-gray-700">
                  Sold: <span className="font-light"> {image?.sold_count}</span>
                </p>
                <p className="text-lg font-semibold mb-3 text-gray-700">
                  Category:{" "}
                  <span className="font-light"> {image?.category}</span>
                </p>
                <p className="text-lg font-semibold mb-3 text-gray-700">
                  Uploaded At:{" "}
                  <span className="font-light">
                    {image?.uploaded_at
                      ? new Date(image.uploaded_at).toLocaleString()
                      : "N/A"}
                  </span>
                </p>
                <p className="text-lg font-semibold mb-3 text-gray-700">
                  <AiFillCamera className="inline-block mr-2 text-gray-600" />
                  Camera: <span className="font-light"> {image?.camera}</span>
                </p>
                <p className="text-lg font-semibold mb-3 text-gray-700">
                  Model:{" "}
                  <span className="font-light"> {image?.camera_model}</span>
                </p>
                <p className="text-lg font-semibold mb-3 text-gray-700">
                  Lens:{" "}
                  <span className="font-light"> {image?.camera_lens}</span>
                </p>
                <p className="text-lg font-semibold mb-3 text-gray-700">
                  Focal Length:{" "}
                  <span className="font-light"> {image?.focal_length}</span>
                </p>
                <p className="text-lg font-semibold mb-3 text-gray-700">
                  Captured Date:{" "}
                  <span className="font-light">{image?.captured_date}</span>
                </p>
                <p className="text-lg font-semibold mb-3 text-gray-700">
                  Image Id: <span className="font-light"> {image?._id}</span>
                </p>
                <p className="text-lg font-semibold mb-3 text-gray-700">
                  Country:{" "}
                  <span className="font-light">
                    {" "}
                    {image?.country == "BD" ? "Bangladesh" : "Malaysia"}
                  </span>
                </p>

                <div className="flex gap-5 justify-center items-center">
                  <button
                    onClick={() => handleDeleteImage(image?._id)}
                    className="flex items-center bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-700 hover:shadow-md transform hover:scale-105 transition duration-300"
                  >
                    <AiFillDelete className="mr-2" /> Delete
                  </button>
                  {image.isLive === false ? (
                    <Link to={"/dashboard/images"}>
                      <button
                        onClick={() => handleApproveImage(image?._id)}
                        className="flex items-center bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-red-700 hover:shadow-md transform hover:scale-105 transition duration-300"
                      >
                        <AiFillDelete className="mr-2" /> Live
                      </button>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <p className="text-lg font-semibold mb-3 text-gray-700 text-justify p-4">
              Description:{" "}
              <span className="font-light"> {image?.description}</span>
            </p>
          </div>
        )
      )}
    </>
  );
};

export default ImageDetail;
