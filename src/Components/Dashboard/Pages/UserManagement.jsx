import React from "react";
import User from "./User";
import UserDeleteRequest from "./UserDeleteRequest";

export default function UserManagement() {
  return (
    <div className="container">
      <User />
      <UserDeleteRequest />
    </div>
  );
}
