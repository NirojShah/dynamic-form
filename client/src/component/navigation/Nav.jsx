import React from "react";

import userStore from "../../store/user.store";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const userName = userStore((state) => state.userName);
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate("/home")

  }
  


  return (
    <div
      className="w-full flex items-center justify-between px-6 py-3 border-b 
  border-black/10 bg-[#163300] font-['Inter',sans-serif]"
    >
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2" onClick={handleClick}>
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-[#163300] text-white text-xs font-bold">
            FC
          </div>
          <h1 className="text-lg font-semibold text-white">FormCraft</h1>
        </div>

        <Button variant="secondary" className="text-sm px-3 py-1.5">
          Templates
        </Button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <Button
          variant="primary"
          className="text-sm px-4 py-1.5 bg-[#9FE870] text-[#163300]"
          onClick={() => {
            navigate("/home/create-form");
          }}
        >
          + New Form
        </Button>

        <Button
          onClick={() => {
            navigate("/home/profile");
          }}
          variant="secondary"
        >
          {userName}
        </Button>
      </div>
    </div>
  );
};

export default Nav;
