    import React, { useEffect, useState } from "react";
    import { ImCheckmark } from "react-icons/im";

    export default function IMEIProduct({
    
    proNum,
    num, setNum
    }) {
    const [select, setSelect] = useState(false);
    useEffect(() => {
        if(JSON.parse(localStorage.getItem(proNum))){
            setSelect(true)
        }else{
            setSelect(false)
        }
    }, [proNum,num]);
    return (
        <div>
        <div
            className={`${select ? `active` : ``} row || g-0 || selectCode || gap-2 || gap-md-0 || align-items-center || justify-content-between`}
        >
            <div className="d-flex || justify-content-center || col-12 col-md-6 || text-start">
            <div className="d-flex || mx-auto || ms-md-0 me-md-auto || gap-2 || align-items-center">
                <div
                className="selectBtn"
                onClick={() => {
                    setNum(num+1)
                    if(select){
                        localStorage.removeItem(proNum)
                        setSelect(false)
                    }else{
                        localStorage.setItem(proNum,JSON.stringify({
                            select:true
                        }))
                        setSelect(true)
                    }
                }}
                >
                <div className="selectBtnIcon">
                    <ImCheckmark />
                </div>
                </div>
                <span className="selectAll">3245454897415</span>
            </div>
            </div>
            <div className="col-12 col-md-6 || text-center || text-md-end">
            493 Day Old
            </div>
        </div>
        </div>
    );
    }
