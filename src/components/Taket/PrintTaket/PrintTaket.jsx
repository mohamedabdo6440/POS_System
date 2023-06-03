import React from 'react'
import "./PrintTaket.css"
export default function PrintTaket() {
  return (
    <div>
         <div className="px-4 blackPrint pt-4">
                <div className="d-flex || pb-2 || align-items-center || justify-content-between">
                <div className="logoTicket">
                    <img
                    src="./img/HomeImg/logoSmall.png"
                    alt="logoSmall"
                    className=""
                    />
                </div>
                <h2 className="text-uppercase || mb-0 || per">Purchase</h2>
                </div>
                <div className="border-2-black || || p-3 ">
                <div className="d-flex || justify-content-between || infoTaket  ">
                    <div className="w-500">
                    <h2 className="text-capitalize || mb-0 || ">
                        My Phillie Wireless
                    </h2>
                    <span className="d-block || || mt-2 || fw-bold">
                        2701 N Broad Street
                    </span>
                    <span className="d-block || || mt-2 || fw-bold">
                        <span>Philadelphia,</span>
                        <span className="ps-2">19121</span>
                    </span>
                    <span className="d-block || || mt-2 || fw-bold">270154156</span>
                    <h2 className="text-uppercase || mt-4 || fs-3 || fw-normal || mb-0 || ">
                        vendor Information
                    </h2>
                    <span className="d-block ||  || fs-4 || ps-3 || mt-2 || fw-light">
                        Customer
                    </span>
                    </div>
                    <div className="w-300">
                    <span className="mb-0 ||  || d-flex || gap-3">
                        <span className="text-uppercase">Store ID </span>
                        <span className="fw-light">CSP4925</span>
                    </span>
                    <span className="mb-0 || mt-2 ||  || d-flex || gap-3">
                        <span className="text-uppercase">Register ID </span>
                        <span className="fw-light">Desktop-k26565</span>
                    </span>
                    <span className="mb-0 || mt-2 ||  || d-flex || gap-3">
                        <span className="text-uppercase">Date </span>
                        <span className="fw-light">1/13/23 8:51AM</span>
                    </span>
                    <span className="mb-0 || mt-2 ||  || d-flex || gap-3">
                        <span className="text-uppercase">Purchase ID </span>
                        <span className="fw-light">11071</span>
                    </span>
                    <span className="mb-0 || mt-2 ||  || d-flex || gap-3">
                        <span className="text-uppercase">Ref no </span>
                    </span>
                    <span className="mb-0 || mt-2 ||  || d-flex || gap-3">
                        <span className="text-uppercase">Rep name </span>
                        <span className="fw-light">admin</span>
                    </span>
                    </div>
                </div>
                </div>
                <div className="active  transactionsTable  tableProduct tableProductControl || border-2-black  px-3  || d-block">
                
                <table className="table table-responsive">
                <thead>
                    <tr>
                        <th colSpan="1">
                        <h5 className="pb-3 text-uppercase ">Qunantity</h5>
                        </th>
                        <th colSpan="3">
                        <h5 className="pb-3 text-uppercase">Item name</h5>
                        </th>
                        <th colSpan="1">
                        <h5 className="pb-3 text-uppercase">imei</h5>
                        </th>
                        <th colSpan="2">
                        <h5 className="pb-3 text-uppercase ">Unit price</h5>
                        </th>
                        <th colSpan="2">
                        <h5 className="pb-3 text-uppercase || border-end-0">ext Amount</h5>
                        </th>
                    </tr>
                    </thead>
                </table>
                <table className="table table-responsive">
                    <tbody className=" containTable tableMain">
                    <tr>
                        <th colSpan="1">
                        <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                            <span className="mb-0  controlWidthProduct  ">1</span>
                        </div>
                        </th>
                    
                        <th colSpan="2">
                        <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                            <span className="mb-0  controlWidthProduct  ">Apple iPhone 13 Pro Max Unlocked SWAP 128Go</span>
                        </div>
                        </th>
                        <th colSpan="2">
                        <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                            <span className="mb-0  controlWidthProduct  ">35353535352</span>
                        </div>
                        </th>
                        <th colSpan="2">
                        <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable">
                            <span className="mb-0  controlWidthProduct  ">$200.00</span>
                        </div>
                        </th>
                        <th colSpan="2">
                        <div className="d-flex  || align-items-center | justify-content-center || gap-2 || hightTable || border-end-0">
                            <span className="mb-0  controlWidthProduct  ">$200.00</span>
                        </div>
                        </th>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div className="d-flex || mt-2 || flex-wrap">
                    <h3 className="py-2 || bgTact">
                        <div className="w-Q">
                            1
                        </div>
                    </h3>
                    <h3 className="py-2 || bgTact"><div className="w-Q new">
                    1 Items(s)</div></h3>
                </div>
                <div className="d-flex || justify-content-end">
                    <h4 className="w-Purchase || mb-0 || p-2 || border-Purchase">Purchase Amount</h4>
                    <span className="w-Purchase || d-flex || align-items-center || justify-content-end || border-start-0 || px-2  || border-Purchase || py-2">$200.00</span>
                </div>
            </div>
    </div>
  )
}
