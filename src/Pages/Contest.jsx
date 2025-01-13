import React, { useState } from "react";
import contestImg from "../assets/contest.jpg";
import { BiPlus } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useCreatePostMutation,
  useGetPostsQuery,
} from "../features/contest/contestPostApi";
function Contest() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState("");

  const { data: postsData } = useGetPostsQuery();
  const [createPost, { error }] = useCreatePostMutation();
  const posts = postsData?.posts || [];

  //   console.log(name, title, description, imageFile, phone, model);
  // handlePost
  const handlePost = async () => {
    if (name && title && description && imageFile && phone && model) {
      const postInfo = new FormData();
      postInfo.append("name", name);
      postInfo.append("title", title);
      postInfo.append("description", description);
      postInfo.append("phone", phone);
      postInfo.append("model", model);
      if (imageFile) {
        postInfo.append("imageUrl", imageFile);
      }
      //   console.log(postInfo);
      //   console.log(name, title);
      try {
        console.log(Object.fromEntries(postInfo));
        await createPost(Object.fromEntries(postInfo)).unwrap();
        toast.success("Post Successfully !", {
          position: "top-right",
        });
      } catch (error) {
        toast.error(error.data.message, {
          position: "top-right",
        });
      }
    } else {
      console.log("all info required");
    }
  };
  //handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setName("");
    setTitle("");
    setDescription("");
    setPhone("");
    setModel("");
    setImageFile(null);
  };
  // handle image change
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  return (
    <div>
      {/* banner section */}
      <section>
        <img src={contestImg} alt="contest-banner" className="w-full h-auto" />
      </section>
      {/* participant section */}
      <section>
        <div className="participant">
          <h1 className="text-3xl text-[#016655] font-bold text-center py-12">
            Participate In Our Contest
          </h1>
          <div className="flex justify-center items center gap-3">
            <div className="content">
              <h2>Participate and win</h2>
              <p>Participate and Shine in photography world </p>
            </div>
            {/* modal */}
            <div className="modal">
              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  {/* {error && <p className="bg-red-500 text-white">{error}</p>} */}
                  <div className="bg-white rounded-lg p-6 w-100">
                    <h2 className="text-xl font-bold mb-4 text-green-600">
                      Post Your Image
                    </h2>

                    <div className="mb-4">
                      <input
                        type="file"
                        name="imageUrl"
                        id="file-input"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        onClick={() =>
                          document.getElementById("file-input").click()
                        }
                        className="mx-auto border hover:text-white p-4 rounded-md hover:bg-green-700 flex items-center justify-center"
                      >
                        Image
                        <BiPlus />
                      </button>
                      {imageFile && (
                        <p className="mt-2 text-gray-600">{imageFile.name}</p>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 mb-4"
                    />
                    <input
                      type="text"
                      placeholder="Enter Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 mb-4"
                    />

                    <input
                      type="textarea"
                      placeholder="Enter Description"
                      value={description}
                      id="value"
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 mb-4"
                    />

                    <input
                      type="text"
                      placeholder="Enter Phone Name"
                      value={phone}
                      id="value"
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 mb-4"
                    />

                    <input
                      type="text"
                      placeholder="Enter Phon model"
                      value={model}
                      id="value"
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 mb-4"
                    />

                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button
                        onClick={handlePost}
                        className="w-full bg-[#016655] text-white p-2 rounded-md hover:bg-[#016644]"
                      >
                        Post
                        {/* {editingIndex !== null ? "Update" : "Create"} */}
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

              <div className="div w-[200px]">
                <button onClick={() => setShowModal(true)}>
                  Upload Photo{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* image section */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {posts.map((post, index) => {
            return (
              <div
                key={index}
                className={`group relative rounded-lg overflow-hidden cursor-pointers`}
                onClick={() => setSelectedImage(image)}
                role="button"
                tabIndex={0}
                // onKeyDown={(e) => {
                //   if (e.key === "Enter" || e.key === " ") {
                //     e.preventDefault();
                //     setSelectedImage(image);
                //   }
                // }}
              >
                <img
                  src={post.imageUrl}
                  alt={post.description}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm mb-2 line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Contest;
