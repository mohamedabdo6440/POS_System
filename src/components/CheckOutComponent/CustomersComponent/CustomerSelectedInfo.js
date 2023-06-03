import React from "react";
import { IoMdClose } from "react-icons/io";

const CustomerSelectedInfo = ({
  id,
  spending,
  first_name,
  last_name,
  email,
  phone,
  points,
  handleSwap,
  setOpenSpends,
}) => {
  return (
    <div>
      <h2 className="text-start || fs-4 || px-2 || d-flex || gap-3 || justify-content-between">
        <span className="fs-5 || d-flex || align-items-center || fs-8">
          Customer Information
        </span>
        <div className="d-flex || justify-content-center || align-items-center || gap-2">
          <h2 className="fs-4 d-none d-md-block"></h2>
          <p
            onClick={handleSwap}
            className="cursor-pointer || mb-0   fs-3 || textClose "
          >
            <IoMdClose />
          </p>
        </div>
      </h2>
      <div
        className="rounded-2 d-flex  || fs-6 || px-3 || align-items-center"
        key={id}
      >
        <div className=" d-flex  w-100 || align-items-center || gap-3 || position-relative  || overflow-auto || scrollStyle || ps-0 ps-lg-4">
          <ul className="ulListHight || text-start || mb-0 || list-unstyled || row || w-100 ">
            <div className="col-xl-6 col-12">
              <h2 className="fs-4 d-block d-md-none">
                {/* <div className="d-flex || justify-content-start || align-items-center || gap-2">
                              <div className="fw-normal fs-6">
                                Target :{" "}
                                <span className="targetText"> ${spending}</span>
                              </div>
                              <div className="position-relative">
                                <CircularProgressbarWithChildren
                                  className="sdas relative"
                                  value={50}
                                  circleRatio={0.7}
                                  styles={{
                                    trail: {
                                      strokeLinecap: "butt",
                                      transformOrigin: "center center",
                                      transform: "rotate(-126deg)",
                                    },
                                    path: {
                                      strokeLinecap: "butt",
                                      transform: "rotate(-126deg)",
                                      transformOrigin: "center center",
                                      stroke: "#0ea5ec",
                                    },
                                    text: {
                                      transformOrigin: "center center",
                                      fill: "#0ea5ec",
                                      top: "50%",
                                    },
                                    backgroundColor: "#3e98c7",
                                  }}
                                  strokeWidth={10}
                                />
                                <div className="CircularProgressbarText targetText">
                                  {(spending) * (100 / 100)}%
                                </div>
                              </div>
                            </div> */}
              </h2>
              <li className="fs-9">
                <span className="mainColorTextInfo ">Name</span> : {first_name}{" "}
                {last_name}
              </li>
              <li className="fs-9">
                <span className="mainColorTextInfo ">Email</span> : {email}
              </li>
              <li className="fs-9">
                <span className="mainColorTextInfo ">Credit</span> :{" "}
                {"32545126541236"}
              </li>
              <li className="fs-9">
                <span className="mainColorTextInfo ">Phone</span> : {phone}
              </li>
            </div>
            <div className="col-xl-6 col-12 ">
              <li
                className="fs-9"
                onClick={() => {
                  setOpenSpends(true);
                }}
              >
                <span className="mainColorTextInfo || cursor-pointer">
                  Spends
                </span>
                <span
                  className="|| cursor-pointer"
                  onClick={() => {
                    setOpenSpends(true);
                  }}
                >
                  {" "}
                  : {spending}
                </span>
              </li>
              <li className="fs-9">
                <span className="mainColorTextInfo ">Account</span> :{" "}
                {first_name}
              </li>
              <li className="fs-9">
                <span className="mainColorTextInfo ">Points</span> : {points}
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerSelectedInfo;
