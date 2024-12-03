import React, { useState } from "react";
import { useIsReadMessageMutation } from "../../../features/support/supportApi";

const Messages = ({ data }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isReadMessage] = useIsReadMessageMutation();
  const unreadMessageCount = data.filter((m) => m.isRead == false);
  const unreadMessage = unreadMessageCount.length;
  const handleIsRead = async (id, item) => {
    console.log(id);
    setSelectedMessage(item);
    await isReadMessage(id).unwrap();
  };
  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 bg-white shadow-md overflow-y-auto">
        <h2 className="text-xl font-semibold p-4 border-b border-gray-200">
          Messages({unreadMessage})
        </h2>
        <ul>
          {data.map((item, index) => (
            <li
              key={index}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-100  ${
                selectedMessage === item ? "bg-gray-200" : ""
              }`}
              onClick={() => handleIsRead(item._id, item)}
            >
              <img
                src={
                  item.profile_pic ||
                  `https://via.placeholder.com/40?text=${item.name[0]}`
                }
                alt={item.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h3
                  className={`text-sm font-medium ${
                    item.isRead ? "fond-bold" : ""
                  }`}
                >
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content */}
      <div className="w-full md:w-2/3 bg-gray-50 flex flex-col justify-start items-start p-6">
        {selectedMessage ? (
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">
              {selectedMessage.name}
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              {selectedMessage.email}
            </p>
            <p className="text-gray-700">{selectedMessage.message}</p>
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Select a message to view details
          </p>
        )}
      </div>
    </div>
  );
};

export default Messages;
