import React from "react";
import PendingImages from "./PendingImages";
import LiveImages from "./LiveImages";
import { useSelector } from "react-redux";
import Category from "./Category";

function Images() {
  const { user } = useSelector((state) => state.auth || {});
  return (
    <div>
      <PendingImages />
      {["superadmin", "admin", "moderator"].includes(user.role) && (
        <LiveImages />
      )}
      {["superadmin", "admin", "moderator"].includes(user.role) && <Category />}
    </div>
  );
}

export default Images;
