import React from "react";
import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../features/contest/contestPostApi";

function ContestImage() {
  const { id } = useParams();
  const { data: postData } = useGetPostQuery(id);
  const post = postData?.post || "";
  return (
    <div>
      <img src={post.imageUrl} alt="" />
    </div>
  );
}

export default ContestImage;
