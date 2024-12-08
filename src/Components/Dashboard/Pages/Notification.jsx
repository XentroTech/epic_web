import React from "react";
import AppNotification from "./AppNotification";
import PushNotification from "./PushNotification";

function Notification() {
  return (
    <div className="flex justify-between items-center gap-3">
      <AppNotification />
      <PushNotification />
    </div>
  );
}

export default Notification;
