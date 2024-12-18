import React from "react";
import User from "./User";
import UserDeleteRequest from "./UserDeleteRequest";
import InactiveUsers from "./InactiveUser";

export default function UserManagement() {
  return (
    <div className="container">
      <User />
      <InactiveUsers />
      <UserDeleteRequest />
    </div>
  );
}
