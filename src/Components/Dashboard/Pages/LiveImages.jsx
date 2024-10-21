import React, { useState, useEffect } from "react";

const LiveImages = () => {
  const [users, setUsers] = useState([]);

  // Simulate fetching data from an API
  useEffect(() => {
    // Example user data
    const fetchData = async () => {
      const data = [
        {
          id: 1,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4hurpUmtj-4uqzqmfUhe0bzWX_gksTSuMhQ&s",
          email: "sajid@example.com",
          role: "Admin",
          userId: "@sajid",
          status: "Live",
          sold: 112,
          likes: 15,
        },
        {
          id: 2,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmHJYRHRrf7njUIeWb08iECTHCQC8WjF9MXA&s",
          email: "ashraf@example.com",
          role: "Editor",
          userId: "@ashraf",
          status: "Live",
          sold: 135,
          likes: 50,
        },
        {
          id: 3,
          image:
            "data:image/jpeg;base64,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",
          email: "riduan@example.com",
          role: "Viewer",
          userId: "@riduan",
          status: "Live",
          sold: 41,
          likes: 2,
        },
        // Add more users as needed
      ];
      setUsers(data);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="py-2">
        <h3 className="text-xl font-semibold leading-tight pb-4 text-slate-600 text-left">
          Live Images
        </h3>
      </div>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
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
                User Id
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sold
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Likes
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
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    <img src={user.image} alt="image" width={50} height={50} />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.userId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">
                    {user.email}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1  inline-flex text-xs leading-5 font-semibold rounded-full  ${
                      user.status === "Live"
                        ? "text-green-800 bg-green-100"
                        : "text-red-800 bg-red-100"
                    } `}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">
                    {user.sold}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">
                    {user.likes}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex gap-3">
                    <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2">
                      Delete
                    </button>
                    <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center me-2 mb-2 ">
                      View
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

export default LiveImages;
