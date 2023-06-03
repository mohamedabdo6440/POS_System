import React, { useEffect } from 'react'

const CustomerInfo = ({ birth_date, bonus_count, spending, fullName, email, points, phone, setCustomerName }) => {


    useEffect(() => {
        if (fullName) {
            setCustomerName(fullName)
        }
    }, [fullName, setCustomerName])

    return (
        <div>
            <div className="d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom">
                <h2 className="fs-7 text-mainControl || ps-2 || fw-normal">
                    Phone
                </h2>{" "}
                <h2 className="text-mainControl || pe-2 || fw-normal || fs-7">
                    {" "}
                    {phone}
                </h2>
            </div>
            <div className="d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom">
                <h2 className="fs-7 text-mainControl || ps-2 || fw-normal">
                    Email
                </h2>{" "}
                <h2 className="text-mainControl || pe-2 || fw-normal || fs-7">
                    {" "}
                    {email}
                </h2>
            </div>
            <div className="d-flex || align-items-center || justify-content-between  || totalBotderBottom">
                <div className="d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || border-0 || w-50 || borderRight">
                    <h2 className="fs-7 text-mainControl || ps-2 || fw-normal">
                        Spending
                    </h2>{" "}
                    <h2 className="text-mainControl || pe-2 || fw-normal || fs-7">
                        ${spending}
                    </h2>
                </div>
                <div className="d-flex || align-items-center || justify-content-between || gap-2 || pe-2 || totalBotderBottom || border-0 || w-50">
                    <h2 className="fs-7 text-mainControl || ps-2 || fw-normal">
                        Bonus Count
                    </h2>{" "}
                    <h2 className="text-mainControl || fw-normal || fs-7">
                        ${bonus_count}
                    </h2>
                </div>
            </div>
            <div className="d-flex || align-items-center || justify-content-between  || totalBotderBottom || border-0">
                <div className="d-flex || align-items-center || justify-content-between || gap-2 || totalBotderBottom || border-0 || w-50 || borderRight">
                    <h2 className="fs-7 text-mainControl || ps-2 || fw-normal">
                        Store Credit
                    </h2>{" "}
                    <h2 className="text-mainControl || pe-2 || fw-normal || fs-7">
                        $ None Data
                    </h2>
                </div>
                <div className="d-flex || align-items-center || justify-content-between || gap-2 || pe-2 || totalBotderBottom || border-0 || w-50">
                    <h2 className="fs-7 text-mainControl || ps-2 || fw-normal">
                        Points
                    </h2>{" "}
                    <h2 className="text-mainControl || fw-normal || fs-7">
                        ${points}
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default CustomerInfo
