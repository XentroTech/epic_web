import React from "react";

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const [prizeImage, setPrizeImage] = React.useState(null);
  const [prizePosition, setPrizePosition] = React.useState("");
  const [prizeTitle, setPrizeTitle] = React.useState("");

  const handleImageChange = (e) => {
    setPrizeImage(e.target.files[0]);
  };

  const handleUpdate = () => {
    // Add update logic here, e.g., send data to backend
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Update Prize Info
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Update Prize Info</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleCancel}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Prize Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full border rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Prize Position
                      </label>
                      <input
                        type="number"
                        value={prizePosition}
                        onChange={(e) => setPrizePosition(e.target.value)}
                        className="mt-1 block w-full border rounded-md p-2"
                        placeholder="Enter prize position"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Prize Title
                      </label>
                      <input
                        type="text"
                        value={prizeTitle}
                        onChange={(e) => setPrizeTitle(e.target.value)}
                        className="mt-1 block w-full border rounded-md p-2"
                        placeholder="Enter prize title"
                      />
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
