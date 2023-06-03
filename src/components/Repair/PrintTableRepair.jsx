import React from "react";

const PrintTableRepair = ({ printRef }) => {
  return (
    <table className="rotated-table" ref={printRef}>
      <tbody>
        <tr>
          <td rowSpan="3" className="wide">
            <div className="d-flex justify-content-center align-items-center">
              <div className="wPrint3Col || printControl || fs-3 || text-center || py-4 || d-flex || align-items-center || gap-2 ">
                <span className="w-25">Notes </span>
                <span className="fw-light || px-3 || py-1 || border-2-black || w-70T || d-flex || align-items-center || justify-content-between">
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque et nulla voluptatem natus{" "}
                  </span>
                </span>
              </div>
            </div>
          </td>
          <td rowSpan="2" className="wide">
            <div className="d-flex justify-content-center align-items-center">
              <div className="wPrint2Col || printControl || fs-3 || text-center || py-4 || d-flex || align-items-center || gap-2 ">
                <span className="w-25">Item Name </span>
                <span className="fw-light || px-3 || py-1 || border-2-black || w-75 || d-flex || align-items-center || justify-content-between">
                  <span>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </span>
                </span>
              </div>
            </div>
          </td>
          <td rowSpan="2" className="wide">
            <div className="d-flex justify-content-center align-items-center">
              <div className="wPrint2Col || printControl || fs-3 || text-center || py-4 || d-flex || align-items-center || gap-2 ">
                <span className="w-25">Customer </span>
                <span className="fw-light || px-3 || py-1 || border-2-black || w-75 || d-flex || align-items-center || justify-content-between ">
                  <span>Sameh</span>
                  <span>015582663</span>
                </span>
              </div>
            </div>
          </td>
          <td className="wide ">
            <div className="d-flex justify-content-center align-items-center">
              <div className="wPrint || printControl || fs-3 || text-center || py-4 || d-flex || align-items-center || gap-2 ">
                <span className="w-20T">Repair #</span>
                <span className="fw-light || px-3 || py-1 || border-2-black || w-70T">
                  22321
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td className="wide">
            <div className="d-flex justify-content-center align-items-center">
              <div className="wPrint || printControl || fs-3 || text-center || py-4 || d-flex || align-items-center || gap-2 ">
                <span className="w-25">Repair </span>
                <span className="fw-light || px-3 || py-1 || border-2-black || w-75 || text-center">
                  <span>8/1/2023{` `}</span>
                  <span>{` `}5:30PM</span>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td className="wide">
            <div className="d-flex justify-content-center align-items-center">
              <div className="wPrint || printControl || text-center || py-4 || d-flex || align-items-center || gap-2 ">
                <span className="w-25  || fs-3 ">Sr #</span>
                <span className="fw-light  || fs-4 || px-3 || py-1 || border-2-black || w-75 ">
                  3256418578942156
                </span>
              </div>
            </div>
          </td>
          <td className="wide">
            <div className="d-flex justify-content-center align-items-center">
              <div className="wPrint printControl || fs-3 || text-center || py-4 || d-flex || align-items-center || gap-2 ">
                <span className="fw-light || px-3 || py-1 || border-2-black  w-100">
                  $0.00
                </span>
              </div>
            </div>
          </td>
          <td className="wide">
            {" "}
            <div className="d-flex justify-content-center align-items-center">
              <div className="wPrint || printControl || fs-3 || text-center || py-4 || d-flex || align-items-center || gap-2 ">
                <span className="w-25">Pass</span>
                <span className="fw-light || px-3 || py-1 || border-2-black || w-75 ">
                  312321
                </span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PrintTableRepair;
