import React, { useState, useEffect } from "react";

const Prizes = () => {
  const allData = [
    {
      name: "Laptop",
      prize: "1st Prize",
      img: "https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_1280.jpg",
    },
    {
      name: "Mobile",
      prize: "2nd Prize",
      img: "https://image01-in.oneplus.net/ebp/202404/07/1-M00-52-A2-CpgM7WYR-viATDPnAATPnD-sVqo964.png",
    },
    {
      name: "Camera",
      prize: "3rd Prize",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToGmavvb0qL2D2KoIVS2L0gIiEz4uSUcGx1g&s",
    },
    {
      name: "300 PicCoin",
      prize: "4th Prize",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaOkZo5lDpjUybyftsu5T36uEI5BZoBGEguA&s",
    },
    {
      name: "250 PicCoin",
      prize: "5h Prize",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaOkZo5lDpjUybyftsu5T36uEI5BZoBGEguA&s",
    },
    {
      name: "200 PicCoin",
      prize: "6th Prize",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaOkZo5lDpjUybyftsu5T36uEI5BZoBGEguA&s",
    },
    {
      name: "150 PicCoin",
      prize: "7th Prize",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaOkZo5lDpjUybyftsu5T36uEI5BZoBGEguA&s",
    },
    {
      name: "100 PicCoin",
      prize: "8th Prize",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaOkZo5lDpjUybyftsu5T36uEI5BZoBGEguA&s",
    },
    {
      name: "50 PicCoin",
      prize: "9th Prize",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaOkZo5lDpjUybyftsu5T36uEI5BZoBGEguA&s",
    },
    {
      name: "25 PicCoin",
      prize: "10th Prize",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaOkZo5lDpjUybyftsu5T36uEI5BZoBGEguA&s",
    },
  ];
  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="py-2">
        <h2 className="text-2xl font-bold leading-tight pb-8 text-green-600 text-left ">
          Game Management
        </h2>
        <h3 className="text-xl font-semibold leading-tight pb-4 text-slate-600 text-left">
          Prizes
        </h3>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Position
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allData.map((data) => (
              <tr
                key={data.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    <img src={data.img} alt="image" width={50} />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{data.prize}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">
                    {data.name}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex gap-3">
                    <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800  shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2">
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Prizes;
