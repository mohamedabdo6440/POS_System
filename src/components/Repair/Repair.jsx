import React, { memo } from "react";
import { GiAutoRepair } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import PopUp from "../PopUp/PopUp";
import "./Repair.css";

const Repair = memo(({ openRepairPage, setOpenRepairPage }) => {
  const navigate = useNavigate();

  return (
    <PopUp open={openRepairPage} setOpen={setOpenRepairPage} headPop="Repair">
      <div className="row || g-0">
        <div className="col-12 px-2 col-lg-6">
          <h2 className="mb-3 || mainColorTextInfo">New</h2>
          <button
            onClick={() => {
              setOpenRepairPage(false);

              navigate("/repair/repair");

            }}
            className="historyLink || w-100  || cancel || rounded-0 || px-4 || mb-3 || py-3 || cursor-pointer || d-flex || align-items-center || gap-2"
          >
            <span className="fs-2 || d-flex">
              <GiAutoRepair />
            </span>
            <span className="fs-4">Repair</span>
          </button>
        </div>
        <div className="col-12 px-2 col-lg-6">
          <h2 className="mb-3 || mainColorTextInfo">History</h2>
          <button
            onClick={() => {
              navigate("/repair");
            }}
            className="historyLink || w-100  || cancel || rounded-0 || px-4 || mb-3 || py-3 || cursor-pointer || d-flex || align-items-center || gap-2"
          >
            <span className="fs-2 || d-flex">
              <GiAutoRepair />
            </span>
            <span className="fs-4">Repairs</span>
          </button>
        </div>
      </div>
    </PopUp>
  );
});
export default Repair;
