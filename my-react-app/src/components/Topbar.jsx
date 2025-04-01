import React from "react";

const Topbar = ({ title = "Screen Recording App" }) => {
  return (
    <div className="w-full bg-[#264653] text-white py-4 px-6 shadow-md">
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  );
};

export default Topbar;