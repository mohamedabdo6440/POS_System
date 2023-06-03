import React from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { ImCheckmark } from "react-icons/im";
import PopUp from "../PopUp/PopUp";

export default function PopUpMessage({ setOpenpopUp, openPop }) {
  return (
    <PopUp open={openPop} setOpen={setOpenpopUp} headPop="Repair Message">
      <div className="unselectable || w-80 || mx-auto">
        <div className="row || g-0 ">
          <div className="col-6 || row || g-0 || pe-2">
            <div className="totalBg || py-2 || px-2 || row || g-0 || align-items-center">
              <div className="col-6">Repair ID</div>
              <div className="col-6 || fw-light || text-end">10554</div>
            </div>
          </div>
          <div className="col-6 || row || g-0 || ps-2">
            <div className="totalBg || py-2 || px-2 || row || g-0 || align-items-center">
              <div className="col-6">Prepaid Credit</div>
              <div className="col-6 || fw-light || text-end || mainColorTextInfo">
                $165.46
              </div>
            </div>
          </div>
        </div>
        <div className="row || g-0 || mt-4">
          <div className="col-6 || pe-2">
            <div className=" totalTax || p-2">
              <div className="">
                <div
                  className={
                    "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || p-0  "
                  }
                >
                  <h2 className="fs-6 || mb-0 || d-flex || align-items-center text-mainControl || fw-normal">
                    <span>Customer Name</span>
                  </h2>
                  <h2 className="fs-6 || d-flex || align-items-center  text-mainControl || fw-normal || fs-7 || mb-0">
                    <span>
                      <input
                        type="text"
                        placeholder="Name"
                        className=""
                        onFocus={(e) => {
                          e.target.value = "";
                        }}
                        id=""
                      />
                    </span>
                    <label
                      htmlFor=""
                      className="d-flex || px-2 || py-2 || cursor-pointer text-mainControl"
                    >
                      <HiOutlinePencil />
                    </label>
                  </h2>
                </div>
                <div
                  className={
                    "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || p-0  "
                  }
                >
                  <h2 className="fs-6 || mb-0 || d-flex || align-items-center text-mainControl || fw-normal">
                    <span>Repair Price</span>
                  </h2>
                  <h2 className="fs-6 || d-flex || align-items-center  text-mainControl || fw-normal || fs-7 || mb-0">
                    <span>
                      <input
                        type="text"
                        placeholder="$0.00"
                        className=""
                        onFocus={(e) => {
                          e.target.value = "";
                        }}
                        id=""
                      />
                    </span>
                    <label
                      htmlFor=""
                      className="d-flex || px-2 || py-2 || cursor-pointer text-mainControl"
                    >
                      <HiOutlinePencil />
                    </label>
                  </h2>
                </div>
                <div
                  className={
                    "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || p-0  "
                  }
                >
                  <h2 className="fs-6 || mb-0 || d-flex || align-items-center text-mainControl || fw-normal">
                    <span>Paid Amount</span>
                  </h2>
                  <h2 className="fs-6 || d-flex || align-items-center  text-mainControl || fw-normal || fs-7 || mb-0">
                    <span>
                      <input
                        type="text"
                        placeholder="$0.00"
                        className=""
                        onFocus={(e) => {
                          e.target.value = "";
                        }}
                        id=""
                      />
                    </span>
                    <label
                      htmlFor=""
                      className="d-flex || px-2 || py-2 || cursor-pointer text-mainControl"
                    >
                      <HiOutlinePencil />
                    </label>
                  </h2>
                </div>
                <div
                  className={
                    "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || border-bottom-0 || p-0  "
                  }
                >
                  <h2 className="fs-6 || mb-0 || d-flex || align-items-center text-mainControl || fw-normal">
                    <span>Amount Due</span>
                  </h2>
                  <h2 className="fs-6 || d-flex || align-items-center  text-mainControl || fw-normal || fs-7 || mb-0">
                    <span>
                      <input
                        type="text"
                        placeholder="$0.00"
                        className=""
                        onFocus={(e) => {
                          e.target.value = "";
                        }}
                        id=""
                      />
                    </span>
                    <label
                      htmlFor=""
                      className="d-flex || px-2 || py-2 || cursor-pointer text-mainControl"
                    >
                      <HiOutlinePencil />
                    </label>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 || ps-2">
            <div className=" totalTax || p-2">
              <div className="d-flex flex-column justify-content-center || h-100 ">
                <div
                  className={
                    "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || p-0  "
                  }
                >
                  <div className="d-flex || justify-content-between || pb-2 || gap-2 || align-items-center || w-100">
                    <div className="selectBtn">
                      <div className="selectBtnIcon">
                        <ImCheckmark />
                      </div>
                    </div>
                    <span className="selectAll">015845545</span>
                    <span className="selectAll">P-Number</span>
                  </div>
                </div>
                <div
                  className={
                    "d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || p-0  "
                  }
                >
                  <div className="d-flex  || justify-content-between || py-2 || gap-2 || align-items-center || w-100">
                    <div className="selectBtn active">
                      <div className="selectBtnIcon">
                        <ImCheckmark />
                      </div>
                    </div>
                    <span className="selectAll">sadasdas@gmail.com</span>
                    <span className="selectAll">Email</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row || g-0 || mt-4">
          <div className="col-12">
            <div className=" totalTax || p-2 d-flex || flex-column ">
              <div className="|| h-100">
                <div className="m-0 || fw-normal || fs-6 || mb-2  || d-flex || align-items-center || justify-content-between">
                  <h5>Message</h5>
                  <h6 className="fs-6 fw-light">
                    Message Cost
                    <span className="mainColorTextInfo"> $0.03</span>
                    <span> x </span>
                    <span className="mainColorTextInfo">$0.03</span>
                    <span> = </span>
                    <span className="mainColorTextInfo">$0.03</span>
                  </h6>
                </div>
                <textarea
                  className="w-100 || textarea"
                  defaultValue={`Dear Sameh your Iphone Fixed`}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="row || g-0 || mt-4">
          <div className="col-12 || d-flex ||  justify-content-lg-end ||  justify-content-center || gap-3 || align-items-center">
            <button className="text-mainControl || mb-0 || fw-normal || py-1 ||  fs-5 || text-uppercase || rounded-0 || proceed">
              Send Message
            </button>
            <button onClick={()=>setOpenpopUp(false)} className="text-mainControl || mb-0 || fw-normal || py-1 ||  fs-5 || text-uppercase || rounded-0 || cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </PopUp>
  );
}
