import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineDelete,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsPencil, BsPrinter } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import { TiMessages } from "react-icons/ti";
import { IoIosArrowForward } from "react-icons/io";
import { TbReport } from "react-icons/tb";
import "./RepairPage.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Reset from "../../components/Reset/Reset";
import PopUpMessage from "../../components/PopUpMessage/PopUpMessage";
export default function RepairPage({ handleBackToPage }) {
  const [openRep, setOpenRep] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [openPop, setOpenpopUp] = useState(false);
  const bgChange = useRef();
  const select = useRef();
  const HandleBg = (e) => {
    bgChange.current.innerHTML = e.target.value;
    if (e.target.value === "working") {
      bgChange.current.style.background = "#607d8b";
    } else if (e.target.value === "checking") {
      bgChange.current.style.background = "#3f51b5";
    } else if (e.target.value === "not Fixed") {
      bgChange.current.style.background = "#e91e63";
    } else if (e.target.value === "fixed") {
      bgChange.current.style.background = "#4caf50";
    }
  };
  useEffect(() => {
    bgChange.current.innerHTML = select.current.value;
    if (select.current.value === "working") {
      bgChange.current.style.background = "#607d8b";
    } else if (select.current.value === "checking") {
      bgChange.current.style.background = "#3f51b5";
    } else if (select.current.value === "not Fixed") {
      bgChange.current.style.background = "#e91e63";
    } else if (select.current.value === "fixed") {
      bgChange.current.style.background = "#4caf50";
    }
  }, [bgChange]);
  return (
    <div className="home || text-mainControl || repairPage ">
      <div className="repairBorderBottom  || overflow-auto || scrollStyle || py-3 || px-5 || d-flex || align-items-center ">
        <div className="d-flex || py-1 || px-3 || border-Icon || fs-5">
          <span
            onClick={handleBackToPage}
            className="fs-5 cursor-pointer d-flex "
          >
            <AiOutlineArrowLeft />
          </span>
        </div>
        <div className="d-flex || py-1 || px-3 || border-Icon || fs-5">
          <FiEye />
        </div>
        <div className="d-flex || py-1 || px-3 || border-Icon || fs-5">
          <BsPrinter />
        </div>
        <div className="d-flex || py-1 || px-3 || border-Icon || fs-5">
          <AiOutlineDelete />
        </div>
        <div className="d-flex || py-1 || px-3 || border-Icon || fs-5">
          <BsPencil />
        </div>
        <div className="d-flex || py-1 || px-3 || border-Icon || fs-5 || gap-2 || align-items-center">
          <TbReport />
          <h5 className="mb-0 || fw-light">Reports</h5>
        </div>
        <div className="d-flex || py-1 || px-3 || border-Icon || fs-5 || gap-2 || align-items-center">
          <h5 className="m-0 fw-normal || fs-6 || mb-0">Period</h5>
          <div className="select">
            <select className="" aria-label=".form-select-lg example">
              <option value="M">Custom</option>
            </select>
          </div>
        </div>
        <div className="d-flex || py-1 || px-3  || fs-5 || gap-2 || align-items-center">
          <h5 className="m-0 fw-normal || fs-6 || mb-0">From</h5>
          <div className="select">
            <select className="" aria-label=".form-select-lg example">
              <option value="M">11/9/2022</option>
            </select>
          </div>
        </div>
        <div className="d-flex || py-1 || pe-3 || border-Icon || fs-5 || gap-2 || align-items-center">
          <div className="d-flex || fs-3">
            <IoIosArrowForward />
          </div>
          <h5 className="m-0 fw-normal || fs-6 || mb-0">to</h5>
          <div className="select">
            <select className="" aria-label=".form-select-lg example">
              <option value="M">11/9/2022</option>
            </select>
          </div>
        </div>
        <div className="ms-3">
          <div
            className={`${
              openRep && `active`
            }  ||  mode || position-relative || unselectable`}
            onClick={(e) => {
              setOpenRep(!openRep);
              e.target.parentElement.classList.toggle("openRep");
            }}
          >
            <div className="position-absolute  || toggleMode "></div>
            <div className="modeElement">Closed</div>
            <div className="modeElement">Open</div>
          </div>
        </div>
      </div>
      <div className="row || g-0 || overFlowHideen || position-relative || handleHightRepair">
        <div
          className={`${
            showReset ? `col-9` : ` col-12`
          } || pt-5 || px-3 || position-relative || transitionWidth`}
        >
          <div
            className="postiveControlReset d-none || d-xl-flex "
            onClick={(e) => {
              setShowReset(!showReset);
            }}
          >
            {!showReset ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
          </div>
          <div className="inputStyleProduct || pt-5 pt-xl-0 || text-start || mb-4 || mx-auto || mx-xl-0  || px-3 ">
            <form>
              <div className="inputStyle || fs-6  || rounded-2 || d-flex || justify-content-between || align-items-center">
                <input type="test" placeholder="Search" className="w-100" />
                <button
                  className="customerBtn px-2 py-0 || position-relative"
                  type="submit"
                >
                  <AiOutlineSearch />
                </button>
              </div>
            </form>
          </div>
          <div
            className={`  tableProduct active tableProductControl table-responsive  px-3 scrollStyle || d-none || d-xl-block me-4 || tableRepair`}
          >
            {/* [afetr select table] This table contains the selected data  */}
            <table className="table table-responsive || text-mainControl">
              <thead>
                <tr>
                  <th colSpan="1">
                    <h5 className="pb-1 || fs-6 || text-center">ID</h5>
                  </th>
                  <th colSpan="3">
                    <h5 className="pb-1 || fs-6 || text-center">Repair Date</h5>
                  </th>
                  <th colSpan="1">
                    <h5 className="pb-1 || fs-6 || text-center">
                      Customer Name
                    </h5>
                  </th>
                  <th colSpan="2">
                    <h5 className="pb-1 || fs-6 || text-center">
                      Phone Number
                    </h5>
                  </th>
                  <th colSpan="2">
                    <h5 className="pb-1 || fs-6 || text-center">Item Name</h5>
                  </th>
                  <th colSpan="2">
                    <h5 className="pb-1 || fs-6 || text-center">Status</h5>
                  </th>
                  <th colSpan="2">
                    <h5 className="pb-1 || fs-6 || text-center">IMEI Number</h5>
                  </th>
                  <th colSpan="2">
                    <h5 className="pb-1 || fs-6 || text-center">Due Amount</h5>
                  </th>
                  <th colSpan="2">
                    <h5 className="pb-1 || fs-6 || text-center">Repair Type</h5>
                  </th>
                  <th colSpan="2">
                    <h5 className="pb-1 || fs-6 || text-center">Assigned To</h5>
                  </th>
                  <th colSpan="2">
                    <h5 className="pb-1 || fs-6 || text-center">Bin</h5>
                  </th>
                  <th colSpan="2">
                    <h5 className="pb-1 || fs-6 || text-center || border-end-0">
                      Notes
                    </h5>
                  </th>
                </tr>
              </thead>
              {/*Start  Table Main*/}
              <tbody className={` containTable tableMain`}>
                <tr>
                  <th colSpan="1">
                    <h4 className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                      <p className="mb-0">12312</p>
                    </h4>
                  </th>
                  <th colSpan="3">
                    <h4 className="d-flex || justify-content-center  || align-items-center || gap-2 || hightTable">
                      <span className="mb-0 || text-center">
                        <p className="mb-0 ">02/07/23</p>
                        <p className="mb-0 ">6:05PM</p>
                      </span>
                    </h4>
                  </th>
                  <th colSpan="1">
                    <h4 className="d-flex || justify-content-center  || align-items-center || gap-2 || hightTable">
                      <p className="mb-0 || text-center">Sameh Elsaid</p>
                    </h4>
                  </th>
                  <th colSpan="2">
                    <h4 className="| hightTable || d-flex || align-items-center || justify-content-center">
                      01558560662
                    </h4>
                  </th>
                  <th colSpan="2">
                    <h4 className="d-flex || justify-content-center || align-items-center || gap-2 || hightTable">
                      <p className="mb-0 || text-center">Iphone 11 screen HQ</p>
                    </h4>
                  </th>
                  <th colSpan="2">
                    {" "}
                    <h4 className="d-flex || justify-content-center || align-items-center || gap-2 || hightTable">
                      <span className="select select2 mb-0">
                        <div
                          className="bgChange text-uppercase"
                          ref={bgChange}
                        ></div>
                        <select
                          className=""
                          aria-label=".form-select-lg example"
                          onChange={HandleBg}
                          ref={select}
                        >
                          <option value="working">Working</option>
                          <option value="checking">Checking</option>
                          <option value="fixed">Fixed</option>
                          <option value="not Fixed">Not Fixed</option>
                        </select>
                      </span>
                      <div
                        onClick={() => setOpenpopUp(true)}
                        className="d-flex || justify-content-center || align-items-center || gap-2  || handleBgAlert || px-2 || py-1"
                      >
                        <p className="mb-0">02</p>
                        <div className="fs-4 d-flex">
                          <TiMessages />
                        </div>
                      </div>
                    </h4>
                  </th>
                  <th colSpan="2">
                    {" "}
                    <h4 className="| hightTable  || d-flex || align-items-center || justify-content-center">
                      {/* Tax Make IT in State */}1574897451465478
                    </h4>
                  </th>
                  <th colSpan="2">
                    {" "}
                    <h4 className="| hightTable  || d-flex || align-items-center || justify-content-center">
                      {/* Tax Make IT in State */}$ 1254
                    </h4>
                  </th>
                  <th colSpan="2">
                    <h4 className="d-flex || justify-content-center || align-items-center || gap-2 || hightTable">
                      <p className="mb-0 ">Hardware</p>
                    </h4>
                  </th>
                  <th colSpan="2">
                    <h4 className="d-flex || justify-content-center || align-items-center || gap-2 || hightTable">
                      <p className="mb-0 ">Admin</p>
                    </h4>
                  </th>
                  <th colSpan="2">
                    <h4 className="d-flex || justify-content-center || align-items-center || gap-2 || hightTable">
                      <p className="mb-0 "></p>
                    </h4>
                  </th>
                  <th colSpan="2">
                    <h4 className="d-flex || justify-content-center || align-items-center || gap-2 || hightTable || border-end-0">
                      <p className="mb-0 || text-center ">Fix Screen</p>
                    </h4>
                  </th>
                </tr>
              </tbody>
              {/*End  Table Main*/}
            </table>
          </div>
        </div>
        <div
          className={`${
            showReset ? ` ` : `active `
          } col-3 || transformTransition || resetAbsolute  || d-none || d-xl-block  || borderProduct`}
        >
          <Reset total={0} productSelected={[]} number={20} />
        </div>
        <PopUpMessage openPop={openPop} setOpenpopUp={setOpenpopUp} />
      </div>
    </div>
  );
}
