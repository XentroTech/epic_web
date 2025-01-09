import React from "react";
import AppNotification from "./AppNotification";
import PushNotification from "./PushNotification";

function Notification() {
  return (
    <div className="container mx-auto py-2">
      <h2 className="text-2xl font-bold leading-tight pb-4 text-green-600">
        Notification Management
      </h2>
      <div className="flex justify-between items-center gap-3">
        <AppNotification />
        <PushNotification />
      </div>
    </div>
  );
}

export default Notification;
