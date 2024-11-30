import React from "react";
import ContactMessage from "./contactMessag";

function SupportAndContact() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="py-2">
        <h2 className="text-2xl font-bold leading-tight pb-4 text-green-600">
          Support and contact Management
        </h2>
      </div>
      <div className="div">
        <ContactMessage />
      </div>
    </div>
  );
}

export default SupportAndContact;
