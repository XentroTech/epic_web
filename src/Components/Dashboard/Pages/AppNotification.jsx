import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSendNotificationMutation } from "../../../features/notification/notificationApi";
const AppNotification = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sendNotification] = useSendNotificationMutation();
  //handle send notification
  const handleSendNotification = async () => {
    await sendNotification({ title, message })
      .unwrap()
      .then((data) => {
        if (data.success) {
          toast.success(`Notifications has been sent to the users!`, {
            position: "top-right",
          });
        }
        setTitle("");
        setMessage("");
      })
      .catch((error) =>
        toast.error(error.data.message, { position: "top-right" })
      );
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="py-2">
        <h2 className="text-2xl font-bold leading-tight pb-4 text-green-600">
          Notification Management
        </h2>
      </div>
      <h2 className="text-xl font-bold leading-tight pb-4 text-red-600">
        Send Notification to all user
      </h2>
      <div className="flex flex-col justify-center items-center w-[500px]">
        <div className=" w-full mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className=" w-full mb-4">
          <textarea
            id="message"
            name="message"
            rows="4"
            cols="50"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none
            focus:ring focus:border-blue-300"
          ></textarea>
        </div>
        <div className="relative w-full mb-4">
          <button
            onClick={handleSendNotification}
            className=" w-full text-white bg-gradient-to-r from-green-600 via-green-700 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-blue-800  shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-md text-xs px-5 py-3.5 text-center me-2  transform hover:scale-105 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppNotification;
