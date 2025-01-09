import React from "react";
import SearchBarTitle from "./searchBarTitle";
import Notification from "./Notification";
import WelcomeScreenInfo from "./WelcomeScreenInfo";

function Notifications() {
  return (
    <div>
      <Notification />
      <SearchBarTitle />
      <WelcomeScreenInfo />
    </div>
  );
}

export default Notifications;
