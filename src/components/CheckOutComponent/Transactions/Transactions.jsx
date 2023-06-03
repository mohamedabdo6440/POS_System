    import React, { useEffect, useRef } from "react";
    import { IoMdClose } from "react-icons/io";
    import { useNavigate } from "react-router-dom";
    import "./Transactions.css";
    export default function Transactions() {
    const popUp = useRef();
    const navigate = useNavigate();
    useEffect(() => {
        function handleClickOutside(event) {
        if (popUp.current && !popUp.current.contains(event.target) &&  !document.querySelector(".Toastify").contains(event.target)) {
            navigate("/");
        }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popUp]);
    const closePop = () => {
        navigate("/");
    };
    return (
        <div className="">
        <div
            className={` "visable"
                } transition CheckOutPop unselectable taket cursor-pointer `}
        >
            <div ref={popUp} className={`popUpChild scrollStylePopUp cursor-auto`}>
            <div className="position-relative h-100">
                <span className={`fs-2  span`}>
                <span className="empty"></span>
                <span className="headPop  || w-100 || text-center"></span>
                <div className="iconPop" onClick={closePop}>
                    <IoMdClose />
                </div>
                </span>
                <div className="ps-4 pe-2 me-2 py-2 my-2 hPopUp scrollStyle overflow-auto">
                <div className="d-flex || align-items-center || gap-4">
                    <h3 className="fs-6">
                    <span className="mainColorTextInfo">From :</span>{" "}
                    <span className="fw-normal || date">13/5/2019</span>
                    </h3>
                    <h3 className="fs-6">
                    <span className="mainColorTextInfo">To :</span>{" "}
                    <span className="fw-normal || date">13/5/2020</span>
                    </h3>
                </div>
                <div className="active  transactionsTable  tableProduct tableProductControl table-responsive  px-3 scrollStyle || d-block me-4">
                    <table className="table table-responsive">
                    <thead>
                        <tr>
                        <th colSpan="1">
                            <h5 className="pb-3">ID</h5>
                        </th>
                        <th colSpan="3">
                            <h5 className="pb-3">Time</h5>
                        </th>
                        <th colSpan="1">
                            <h5 className="pb-3">Customer</h5>
                        </th>
                        <th colSpan="2">
                            <h5 className="pb-3">Phone Number</h5>
                        </th>
                        <th colSpan="2">
                            <h5 className="pb-3">Product Name</h5>
                        </th>
                        <th colSpan="2">
                            <h5 className="pb-3">Invoice Type</h5>
                        </th>
                        <th colSpan="2">
                            <h5 className="pb-3">IMIE Number</h5>
                        </th>
                        <th colSpan="2">
                            <h5 className="pb-3">Rep Name</h5>
                        </th>
                        <th colSpan="2">
                            <h5 className="pb-3">Discount</h5>
                        </th>
                        <th colSpan="2">
                            <h5 className="pb-3">Quantity</h5>
                        </th>
                        <th colSpan="2">
                            <h5 className="pb-3">Tax Amount</h5>
                        </th>
                        <th colSpan="2">
                            <h5 className="pb-3 border-end-0">Ext Amount</h5>
                        </th>
                        </tr>
                    </thead>
                    <tbody className=" containTable tableMain">
                        <tr>
                        <th colSpan="1">
                            <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                            <span className="mb-0  controlWidthProduct  ">1</span>
                            </div>
                        </th>
                        <th colSpan="3">
                            <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                            <span className="mb-0 || text-center || controlWidthProduct  ">
                                <span className="mb-0 || d-block">1/12/2032</span>
                                <span className="mb-0 || d-block">1:25PM</span>
                            </span>
                            </div>
                        </th>
                        <th colSpan="1">
                            <span className="d-flex || align-items-center || gap-2 || justify-content-center || w-100 | hightTable">
                            <span className="mb-0">01558290662</span>
                            </span>
                        </th>
                        <th colSpan="2">
                            <h4 className="| hightTable || d-flex || align-items-center || justify-content-center">
                            Iphone
                            </h4>
                        </th>
                        <th colSpan="2">
                            <h4 className="| hightTable || d-flex || align-items-center || justify-content-center">
                            Repair Resopen
                            </h4>
                        </th>
                        <th colSpan="2">
                            <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                            <span className="mb-0  controlWidthProduct  "> </span>
                            </div>
                        </th>
                        <th colSpan="2">
                            <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                            <p className="mb-0  controlWidthProduct  ">Admin</p>
                            </div>
                        </th>
                        <th colSpan="2">
                            <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                            <span className="mb-0  controlWidthProduct  ">
                                0.00
                            </span>
                            </div>
                        </th>
                        <th colSpan="2">
                            <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                            <span className="mb-0  controlWidthProduct  ">
                                0.00
                            </span>
                            </div>
                        </th>
                        <th colSpan="2">
                            <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                            <span className="mb-0  controlWidthProduct  ">
                                -1
                            </span>
                            </div>
                        </th>
                        <th colSpan="2">
                            <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                            <span className="mb-0  controlWidthProduct  ">
                                0.00
                            </span>
                            </div>
                        </th>
                        <th colSpan="2">
                            <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable   || border-end-0">
                            <span className="mb-0  controlWidthProduct">
                                0.00
                            </span>
                            </div>
                        </th>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    }
