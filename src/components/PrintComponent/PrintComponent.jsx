import React from "react";

export default function PrintComponent() {
  return (
    <div className="printControl">
      <div className="row || g-0 || px-3">
        <div className="col-3 || fs-4 || text-center || py-4 || d-flex || align-items-center || gap-2">
          <span className="">Repair #</span>
          <span className="fw-light || px-3 || py-1 || border-2-black ">
            22321
          </span>
        </div>
        <div className="col-6 || fs-4 || text-center || py-4 || d-flex || align-items-center || gap-2 || pe-2">
          <span className="w-25">Repair </span>
          <span className="fw-light || px-3 || py-1 || border-2-black || w-75 || text-center">
            <span>8/1/2023{` `}</span>
            <span>{` `}5:30PM</span>
          </span>
        </div>
        <div className="col-3 || fs-4 || text-center || py-4 || d-flex || align-items-center || gap-2">
          <span className="w-25">Pass</span>
          <span className="fw-light || px-3 || py-1 || border-2-black || w-75 ">
            312321
          </span>
        </div>
      </div>
      <div className="row || g-0 || px-3">
        <div className="col-9 || fs-4 || text-center || py-4 || d-flex || align-items-center || gap-2 || pe-2">
          <span className="w-25">Customer </span>
          <span className="fw-light || px-3 || py-1 || border-2-black || w-75 || d-flex || align-items-center || justify-content-between">
            <span>Sameh</span>
            <span>015582663</span>
          </span>
        </div>
        <div className="col-3 || fs-4 || text-center || py-4 || d-flex || align-items-center || gap-2">
          <span className="fw-light || px-3 || py-1 || border-2-black || w-75 || ms-auto ">
            $0.00
          </span>
        </div>
      </div>
      <div className="row || g-0 || px-3">
        <div className="col-7 || fs-4 || text-center || py-4 || d-flex || align-items-center || gap-2 || pe-2">
          <span className="w-25">Item Name </span>
          <span className="fw-light || px-3 || py-1 || border-2-black || w-75 || d-flex || align-items-center || justify-content-between">
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </span>
        </div>
        <div className="col-5 || fs-4 || text-center || py-4 || d-flex || align-items-center || gap-2 || pe-2">
          <span className="w-25">Sr #</span>
          <span className="fw-light || px-3 || py-1 || border-2-black || w-75 || d-flex || align-items-center || justify-content-between">
            <span>3256418578942156</span>
          </span>
        </div>
      </div>
      <div className="row || g-0 || px-3">
        <div className="col-12 || fs-4 || text-center || py-4 || d-flex || align-items-center || gap-2 || pe-2">
          <span className="w-25">Notes </span>
          <span className="fw-light || px-3 || py-1 || border-2-black || w-75 || d-flex || align-items-center || justify-content-between">
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque et
              nulla voluptatem natus
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
