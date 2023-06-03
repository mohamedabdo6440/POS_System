import React from "react";
import { ImCheckmark } from "react-icons/im";
import PopUp from "../PopUp/PopUp";

export default function PopUpCustomer({
  openPopList,
  setOpenpopUpList,
  customer,
  CustomerSelected,
}) {
  return (
    <PopUp open={openPopList} setOpen={setOpenpopUpList} headPop="Customer">
      <div className="border  mt-2 || h-100 ">
        <div className="py-1 || text-black || mb-2 || mainColorText || border-bottom || d-flex || cursor-auto || align-items-center || justify-content-between || px-0 px-xl-3 ">
          <div className="d-flex || w-100 || px-2 || text-start || cursor-auto">
            Name
          </div>
          <div className="w-30px || text-end || d-flex || justify-content-center  || border-start ">
            <div className="fs-5 || px-2  || d-flex || fw-normal || mb-0 || w-70px">
              Select
            </div>
          </div>
        </div>
        <div className="px-0 ">
          <div className="py-1 | || text-black  || mainColorText || border-bottom || d-flex || align-items-center || justify-content-between || px-0 px-xl-3 ">
            <div className="d-flex px-2 | w-100-70  || text-start">
              asdasdsad
            </div>
            <div className="w-30px || text-end || || d-flex || justify-items-center || || border-start ">
              <p
                onClick={() => {}}
                className="fs-5  px-2  || p-2 || d-flex || cursor-pointer || mx-auto || text-success || mb-0"
              >
                <ImCheckmark />
              </p>
            </div>
          </div>
        </div>
        {customer.map((cust, i) => {
          return (
            <div key={i} className="px-0 ">
              <div className="py-1 | || text-black  || mainColorText || border-bottom || d-flex || align-items-center || justify-content-between || px-0 px-xl-3 ">
                <div className="d-flex px-2 | w-100-70  || text-start">
                  {cust.str}
                </div>
                <div className="w-30px || text-end || || d-flex || justify-items-center || || border-start ">
                  <p
                    onClick={() => {
                      CustomerSelected(cust);
                    }}
                    className="fs-5  px-2  || p-2 || d-flex || cursor-pointer || mx-auto || text-success || mb-0"
                  >
                    <ImCheckmark />
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PopUp>
  );
}
