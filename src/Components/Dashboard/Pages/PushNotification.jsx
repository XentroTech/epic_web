import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSendPushNotificationMutation } from "../../../features/notification/pushNotificationApi";
import { useSendNotificationMutation } from "../../../features/notification/notificationApi";
const PushNotification = () => {
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [sendPushNotification] = useSendPushNotificationMutation();
  const [sendNotification] = useSendNotificationMutation();
  //handle send notification

  const handleSendNotification = async () => {
    await sendPushNotification({
      title,
      msg,
    })
      .unwrap()
      .then((data) => {
        if (data.success) {
          toast.success(`Push Notifications has been sent to the users!`, {
            position: "top-right",
          });
        }
        setTitle("");
        setMsg("");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.data?.message, { position: "top-right" });
      });

    // sending same message in in app notification
    await sendNotification({
      title,
      message: msg,
      image: "https://dev.e-pic.co/uploads/epic_logo.png",
    })
      .unwrap()
      .then((data) => {
        if (data.success) {
          toast.success(`App Notifications has been sent to the users!`, {
            position: "top-right",
          });
        }
        setTitle("");
        setMsg("");
      })
      .catch((error) =>
        toast.error(error.data.message, { position: "top-right" })
      );
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="py-2"></div>
      <h2 className="text-xl font-bold leading-tight pb-4 text-gray-600">
        Send Push Notification to all user
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
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
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

export default PushNotification;
