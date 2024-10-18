import React from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
const Header: React.FC = () => {
  return (
    <header className="bg-gray-800  text-white p-3 flex items-center fixed top-0 left-0 w-full z-10">
      <button className="mr-4 focus:outline-none" aria-label="Menu">
        <WorkOutlineIcon className="w-6 h-6" />
      </button>
      <h1 className="text-xl font-bold">Job Portal</h1>
    </header>
  );
};

export default Header;
