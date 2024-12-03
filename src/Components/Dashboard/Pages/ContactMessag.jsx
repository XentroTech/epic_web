import React from "react";
import Messages from "./massages";
import { useGetSupportMessagesQuery } from "../../../features/support/supportApi";

function ContactMessage() {
  const { data } = useGetSupportMessagesQuery();
  const messages = data?.messages || [];
  return (
    <div>
      <Messages data={messages} />
    </div>
  );
}

export default ContactMessage;
