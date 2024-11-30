import React from "react";
import Messages from "./massages";
import { useGetSupportMessagesQuery } from "../../../features/support/supportApi";

function ContactMessage() {
  const sampleData = [
    {
      name: "John Doe",
      email: "john@example.com",
      time: "10:00 AM, Nov 28",
      message: "Hello, I would like to know more about your services.",
      image: "", // You can add user image URLs here
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      time: "11:30 AM, Nov 28",
      message: "Can you share your pricing details?",
      image: "",
    },
    {
      name: "Sam Wilson",
      email: "sam@example.com",
      time: "2:45 PM, Nov 28",
      message: "I’m interested in collaborating.",
      image: "",
    },
  ];
  const { data } = useGetSupportMessagesQuery();
  const messages = data?.messages || [];
  console.log(messages);
  return (
    <div>
      <Messages data={messages} />
    </div>
  );
}

export default ContactMessage;
